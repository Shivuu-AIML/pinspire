import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Tag, FolderOpen, FileText } from 'lucide-react';
import { api } from '../api';
import type { Category } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function UploadPage() {
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setSelectedImage(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handlePublish = async () => {
    if (!selectedImage || !title) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    navigate('/home');
  };

  useState(() => {
    api.getCategories().then(setCategories);
  });

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold font-[Sora] text-center mb-2">Create Pin</h1>
          <p className="text-slate-500 text-center text-sm mb-8">Share your inspiration with the world</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Upload */}
            <div>
              <AnimatePresence mode="wait">
                {selectedImage ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800"
                  >
                    <img src={selectedImage} alt="Preview" className="w-full object-contain max-h-[500px]" />
                    <button
                      onClick={() => { setSelectedImage(null); setSelectedFile(null); }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`h-80 border-3 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                      dragOver
                        ? 'border-primary bg-primary/5 scale-[1.02]'
                        : 'border-slate-300 dark:border-slate-600 hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Upload size={28} className="text-primary" />
                    </div>
                    <p className="font-semibold mb-1">Click to upload or drag & drop</p>
                    <p className="text-sm text-slate-400">PNG, JPG, GIF up to 20MB</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <Input
                label="Title"
                placeholder="Give your pin a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                icon={<FileText size={18} />}
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What's this pin about?"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm placeholder-slate-400 transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
              <Input
                label="Tags"
                placeholder="travel, photography, nature"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                icon={<Tag size={18} />}
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                <div className="relative">
                  <FolderOpen size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm transition-all focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 appearance-none"
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button
                onClick={handlePublish}
                isLoading={loading}
                disabled={!selectedImage || !title}
                className="w-full"
                size="lg"
              >
                Publish Pin
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

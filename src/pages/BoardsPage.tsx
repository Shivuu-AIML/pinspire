import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Lock, Globe, Trash2, Edit3 } from 'lucide-react';
import { useBoardStore } from '../stores';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';

export function BoardsPage() {
  const { boards, loadBoards, createBoard, deleteBoard, renameBoard } = useBoardStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDesc, setNewBoardDesc] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => { loadBoards(); }, [loadBoards]);

  const handleCreate = () => {
    if (!newBoardName.trim()) return;
    createBoard(newBoardName.trim(), newBoardDesc.trim() || undefined);
    setNewBoardName('');
    setNewBoardDesc('');
    setShowCreateModal(false);
  };

  const handleRename = (id: string) => {
    if (!editName.trim()) return;
    renameBoard(id, editName.trim());
    setEditingId(null);
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-[Sora]">Your Boards</h1>
            <p className="text-slate-500 text-sm mt-1">{boards.length} boards</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} icon={<Plus size={18} />}>
            Create Board
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board, i) => (
            <motion.div
              key={board.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                {board.coverImage ? (
                  <img src={board.coverImage} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    {board.isPrivate ? <Lock className="text-slate-300" size={32} /> : <Globe className="text-slate-300" size={32} />}
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditingId(board.id); setEditName(board.name); }}
                    className="p-2 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => deleteBoard(board.id)}
                    className="p-2 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                {editingId === board.id ? (
                  <form onSubmit={(e) => { e.preventDefault(); handleRename(board.id); }} className="flex gap-2">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 h-8 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                    />
                    <button type="submit" className="px-3 h-8 rounded-lg bg-primary text-white text-xs font-medium">
                      Save
                    </button>
                  </form>
                ) : (
                  <>
                    <h3 className="font-semibold">{board.name}</h3>
                    {board.description && <p className="text-sm text-slate-500 mt-1">{board.description}</p>}
                    <p className="text-xs text-slate-400 mt-2">{board.pins.length} pins</p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create Board"
          size="sm"
        >
          <div className="space-y-4">
            <Input
              label="Board name"
              placeholder="e.g. Travel Inspiration"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
            />
            <Input
              label="Description (optional)"
              placeholder="What's this board about?"
              value={newBoardDesc}
              onChange={(e) => setNewBoardDesc(e.target.value)}
            />
            <div className="flex gap-3 pt-2">
              <Button onClick={() => setShowCreateModal(false)} variant="secondary" className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreate} className="flex-1">
                Create
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useAuthStore } from '../stores';
import { Button } from '../components/ui/Button';

const INTERESTS = [
  { id: 'technology', label: 'Technology', emoji: '💻' },
  { id: 'ai', label: 'AI & Machine Learning', emoji: '🤖' },
  { id: 'programming', label: 'Programming', emoji: '⌨️' },
  { id: 'design', label: 'UI/UX Design', emoji: '🎨' },
  { id: 'fashion', label: 'Fashion', emoji: '👗' },
  { id: 'food', label: 'Food & Recipes', emoji: '🍕' },
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'photography', label: 'Photography', emoji: '📸' },
  { id: 'architecture', label: 'Architecture', emoji: '🏛️' },
  { id: 'gaming', label: 'Gaming', emoji: '🎮' },
  { id: 'fitness', label: 'Fitness', emoji: '💪' },
  { id: 'art', label: 'Art', emoji: '🖼️' },
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'film', label: 'Film & Cinema', emoji: '🎬' },
];

export function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();
  const { updateProfile } = useAuthStore();

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    updateProfile({ interests: selectedInterests });
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative"
      >
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s <= step ? 'w-12 bg-primary' : 'w-8 bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 sm:p-10">
          {step === 1 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-bold font-[Sora] text-center mb-2">Welcome to Pinspire!</h1>
              <p className="text-slate-500 text-center mb-8">
                Pick at least 3 topics you're interested in to personalize your feed
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
                {INTERESTS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest.id);
                  return (
                    <motion.button
                      key={interest.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleInterest(interest.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <span className="text-2xl">{interest.emoji}</span>
                      <span className="text-xs font-medium text-center leading-tight">{interest.label}</span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center"
                        >
                          <Check size={12} />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
              <Button
                onClick={() => setStep(2)}
                disabled={selectedInterests.length < 3}
                className="w-full"
                size="lg"
              >
                Continue ({selectedInterests.length}/3 minimum)
              </Button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-2xl font-bold font-[Sora] mb-3">You're all set!</h1>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                We've personalized your feed based on your interests. You can change these anytime in settings.
              </p>
              <Button onClick={handleComplete} size="lg" className="px-12">
                Start Exploring
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

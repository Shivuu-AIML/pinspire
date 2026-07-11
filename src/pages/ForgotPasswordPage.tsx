import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 sm:p-10">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors mb-6">
            <ArrowLeft size={16} /> Back to login
          </Link>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold font-[Sora] mb-2">Check your email</h2>
              <p className="text-slate-500 text-sm mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <Button onClick={() => setSent(false)} variant="secondary" className="w-full">
                Didn't receive? Try again
              </Button>
            </motion.div>
          ) : (
            <>
              <h1 className="text-2xl font-bold font-[Sora] mb-2">Forgot password?</h1>
              <p className="text-slate-500 text-sm mb-8">
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail size={18} />}
                />
                <Button type="submit" isLoading={loading} className="w-full" size="lg">
                  Send Reset Link
                </Button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

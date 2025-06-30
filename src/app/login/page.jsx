"use client"
import { useState, Suspense } from 'react'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/admin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()

      if (data.success) {
        toast.success('Login successful!')
        
        // Verify cookie was set
        const checkAuth = await fetch('/api/auth/check', { credentials: 'include' })
        const authData = await checkAuth.json()
        
        if (authData.isAuthenticated) {
          router.push(redirectTo)
        } else {
          toast.error('Authentication failed - please try again')
        }
      } else {
        toast.error(data.message || 'Login failed')
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden w-full max-w-md border border-red-200/30">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-red-100/80">Sign in to access your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-red-200" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-red-50/10 border border-red-200/30 rounded-lg text-white placeholder-red-200/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-red-200" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-red-50/10 border border-red-200/30 rounded-lg text-white placeholder-red-200/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-red-200 hover:text-white" />
                  ) : (
                    <Eye className="h-5 w-5 text-red-200 hover:text-white" />
                  )}
                </button>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-red-500/80 to-red-600/90 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-5/30 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>

              <div className="flex items-center justify-between text-sm text-red-100/80 mt-4">
                <a href="#" className="hover:text-white hover:underline transition-colors">Forgot password?</a>
                <a href="/register" className="hover:text-white hover:underline transition-colors">Create account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
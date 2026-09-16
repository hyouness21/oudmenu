import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

export default function PasswordChange() {
  const { changePassword } = useAuth()
  const [newPass, setNewPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (newPass !== confirm) return setError('Passwords do not match.')
    if (newPass.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true)
    try {
      await changePassword(newPass)
      setSuccess(true)
      setNewPass('')
      setConfirm('')
    } catch (err) {
      setError('Failed to update password. You may need to log in again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-sm">
      <h2 className="font-playfair text-brown text-2xl font-bold mb-6">Change Password</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="admin-label">New Password</label>
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
            minLength={6}
            placeholder="••••••••"
            className="input-field"
          />
        </div>
        <div>
          <label className="admin-label">Confirm Password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            placeholder="••••••••"
            className="input-field"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {success && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-dark text-sm font-medium">
            ✓ Password updated successfully.
          </motion.p>
        )}

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  )
}

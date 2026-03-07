"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2, Plus, Trash, Copy, Key, ShieldCheck } from "lucide-react"

export default function ApiKeyManager() {
  const [keys, setKeys] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [lastCreatedKey, setLastCreatedKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadKeys()
  }, [])

  const loadKeys = async () => {
    try {
      const response = await fetch("/api/account/api-keys")
      if (response.ok) {
        const data = await response.json()
        setKeys(data.keys)
      }
    } catch (err) {
      console.error("Failed to load keys:", err)
    } finally {
      setLoading(false)
    }
  }

  const createKey = async () => {
    if (!newKeyName) return
    setCreating(true)
    setError(null)
    try {
      const response = await fetch("/api/account/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName, scopes: ["read:market", "read:listings"] }),
      })
      if (response.ok) {
        const data = await response.json()
        setLastCreatedKey(data.key.rawKey)
        setNewKeyName("")
        loadKeys()
      } else {
        const errData = await response.json()
        setError(errData.error || "Failed to create key")
      }
    } catch (err) {
      setError("An unexpected error occurred.")
    } finally {
      setCreating(false)
    }
  }

  const deleteKey = async (id: string) => {
    if (!confirm("Are you sure you want to revoke this API key? This action cannot be undone.")) return
    try {
      const response = await fetch(`/api/account/api-keys/${id}`, { method: "DELETE" })
      if (response.ok) {
        loadKeys()
      }
    } catch (err) {
      console.error("Failed to delete key:", err)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-accent opacity-50" />
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold text-foreground">Active API Keys</Label>
        </div>
        
        {keys.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center">
            <Key className="mx-auto h-8 w-8 text-muted-foreground opacity-20 mb-3" />
            <p className="text-sm text-muted-foreground">No API keys generated yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {keys.map((key) => (
              <div key={key.id} className="flex items-center justify-between rounded-xl border border-border bg-background p-4 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{key.name}</p>
                    <Badge variant="outline" className="text-[10px] py-0">{key.scopes.join(", ")}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs text-muted-foreground font-mono">{key.prefix}</code>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Created {new Date(key.createdAt).toLocaleDateString()}
                    {key.lastUsedAt && ` • Last used ${new Date(key.lastUsedAt).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => deleteKey(key.id)}
                    className="p-2 text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4 border-t border-border pt-8">
        <Label className="text-sm font-semibold text-foreground">Create New Institutional Key</Label>
        <div className="flex gap-4">
          <Input 
            value={newKeyName} 
            onChange={(e) => setNewKeyName(e.target.value)}
            placeholder="e.g., External Dashboard - Corporate Site"
            className="flex-1"
          />
          <Button onClick={createKey} disabled={creating || !newKeyName} className="flex items-center gap-2">
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Generate Key
          </Button>
        </div>
        {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
      </div>

      {lastCreatedKey && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6 animate-in slide-in-from-bottom-2 fade-in">
          <div className="flex items-center gap-2 text-emerald-500 mb-3">
            <ShieldCheck className="h-4 w-4" />
            <p className="text-sm font-semibold">API Key Generated Successfully</p>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Copy this key now. For security reasons, it will not be shown again.
          </p>
          <div className="flex items-center gap-2 rounded-lg bg-background p-3 border border-emerald-500/20 shadow-inner">
            <code className="text-sm font-mono text-foreground flex-1 break-all">{lastCreatedKey}</code>
            <button 
              onClick={() => copyToClipboard(lastCreatedKey)}
              className="p-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <Button variant="outline" size="sm" onClick={() => setLastCreatedKey(null)} className="mt-4 w-full">
            Done
          </Button>
        </div>
      )}
    </div>
  )
}

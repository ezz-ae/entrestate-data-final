"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Save } from "lucide-react"

export default function StrategicProfileEditor({ initialProfile, disabled }: { initialProfile: any; disabled?: boolean }) {
  const [profile, setProfile] = useState(initialProfile)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (disabled) return;
    setLoading(true)
    try {
      const response = await fetch("/api/account/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })
      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error("Failed to save strategic profile:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-12">
      <div className="space-y-8">
        {/* Risk Bias Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-foreground">Risk Bias</Label>
            <Badge variant="outline" className="text-xs text-blue-400">
              {Math.round(profile.riskBias * 100)}% Market Weight
            </Badge>
          </div>
          <Slider
            value={[profile.riskBias * 100]}
            max={100}
            step={1}
            disabled={disabled}
            onValueChange={(val) => setProfile({ ...profile, riskBias: val[0] / 100 })}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Aggressive (Data Density Priority)</span>
            <span>Conservative (Reliability Priority)</span>
          </div>
        </div>

        {/* Yield vs Safety Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold text-foreground">Yield vs. Safety Bias</Label>
            <Badge variant="outline" className="text-xs text-emerald-400">
              {profile.yieldVsSafety > 0.5 ? "Yield Seeker" : "Safety Seeker"}
            </Badge>
          </div>
          <Slider
            value={[profile.yieldVsSafety * 100]}
            max={100}
            step={1}
            disabled={disabled}
            onValueChange={(val) => setProfile({ ...profile, yieldVsSafety: val[0] / 100 })}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Capital Safety Priority</span>
            <span>Yield & Appreciation Priority</span>
          </div>
        </div>

        {/* Investment Horizon Section */}
        <div className="space-y-4">
          <Label className="text-sm font-semibold text-foreground">Investment Horizon</Label>
          <div className="flex flex-wrap gap-2">
            {["Ready", "1-2yr", "3-5yr", "10yr+"].map((h) => (
              <button
                key={h}
                disabled={disabled}
                onClick={() => setProfile({ ...profile, horizon: h })}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                  profile.horizon === h
                    ? "border-accent bg-accent/10 text-accent shadow-sm"
                    : "border-border bg-background text-muted-foreground hover:bg-secondary"
                } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 border-t border-border pt-8">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="flex h-10 min-w-32 items-center gap-2"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Strategy
            </>
          )}
        </Button>
        {saved && (
          <span className="text-xs font-medium text-emerald-500 animate-in fade-in slide-in-from-left-2">
            Strategic profile updated and synchronized.
          </span>
        )}
      </div>
    </div>
  )
}

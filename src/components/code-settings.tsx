import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
  } from "@/components/ui/sheet"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Checkbox } from "@/components/ui/checkbox"
  import {Button} from "@/components/ui/button"
  import {Input} from "@/components/ui/input"
  import {Label } from "@/components/ui/label"
  import { useToast } from "./ui/use-toast"
import {Cog} from 'lucide-react'
import { Separator } from "./ui/separator"

export type CodeSettingsProps = {
    fontSize: string
    fontFamily: string
    official: {id: string, label: string, active: boolean}[]
    micropip: {id: string, label: string, active: boolean}[]
    setFontSize: (value: string) => void
    setFontFamily: (value: string) => void
    setOfficialPackages: (value: {id: string, label: string, active: boolean}[]) => void
    setMicropipPackages: (value: {id: string, label: string, active: boolean}[]) => void
}
export function CodeSettings({
    fontSize,
    fontFamily,
    setFontSize,
    setFontFamily,
    setOfficialPackages,
    setMicropipPackages,
    official,
    micropip
  }: CodeSettingsProps) {
    const {toast} = useToast()

    const handleOfficialPackages = (id: string) => {
      const updatedPackages = official.map((pkg) => {
        if (pkg.id === id) {
          return { ...pkg, active: !pkg.active }
        }
        return pkg
      })
      setOfficialPackages(updatedPackages)
    }

    const handleMicropipPackages = (id: string) => {
      const updatedPackages = micropip.map((pkg) => {
        if (pkg.id === id) {
          return { ...pkg, active: !pkg.active }
        }
        return pkg
      })
      setMicropipPackages(updatedPackages)
    }

    return (
      <Sheet>
        <SheetTrigger><Cog size={24} className='cursor-pointer text-gray-700'/></SheetTrigger>
        <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
            <SheetDescription>Customize your editor settings and install packages</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
        <Select value={fontFamily} onValueChange={setFontFamily}>
          <SelectTrigger>
            <SelectValue placeholder="Font Family"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="--font-fira-code">Fira Code</SelectItem>
            <SelectItem value="--font-jetbrains-mono">JetBrains Mono</SelectItem>
            <SelectItem value="--font-source-code-pro">Source Code Pro</SelectItem>
            <SelectItem value="--font-inter">Inter</SelectItem>
            <SelectItem value="--font-chivo">Chivo</SelectItem>
          </SelectContent>
        </Select>
        
        <Label>Font Size</Label>
        <Input type="number" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />

        <h2 className="text-lg font-semibold">Install Packages</h2>
        <Label>Official Packages</Label>
        <div className="flex flex-col gap-2">
          {official.map((pkg) => (
            <div key={pkg.id} className="flex items-center gap-2">
              <Checkbox key={pkg.id} id={pkg.id} className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70" checked={pkg.active} onCheckedChange={(checked) => {
                handleOfficialPackages(pkg.id)
                return checked
              }} />
              <Label htmlFor={pkg.id}>{pkg.label}</Label>
            </div>
          ))}
        </div>
        <Separator/>
        <Label>Micropip Packages</Label>
        <div className="flex flex-col gap-2">
          {micropip.map((pkg) => (
            <div key={pkg.id} className="flex items-center gap-2">
              <Checkbox key={pkg.id} className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70" checked={pkg.active} onCheckedChange={() => handleMicropipPackages(pkg.id)} id={pkg.id}  />
              <Label htmlFor={pkg.id}>{pkg.label}</Label>
            </div>
          ))}
        </div>
        <SheetClose>
            <Separator/>
        <Button
        className="w-full mt-4"
         onClick={() => toast({
            title: 'Settings Saved',
            description: 'Your settings have been saved',
            })}>Save</Button>
        </SheetClose>
        </div>
        </SheetContent>
      </Sheet>
    )
  }
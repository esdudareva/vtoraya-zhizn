/* Login page — Eco-Minimalism */
import { useState } from "react";
import { Link } from "wouter";
import { Leaf, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type Mode = "login" | "register";

export default function Login() {
  const [mode, setMode] = useState<Mode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      toast.success("Добро пожаловать!");
    } else {
      toast.success("Аккаунт создан! Добро пожаловать в «Вторую жизнь».");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663568518180/3hUq5UHQuiApEEj6h2u9CY/process-workshop-iVTWZSsu79CpwVvhWtWbyN.webp"
          alt="Украшения"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/60" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <div className="text-primary-foreground">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-5 h-5" />
              <span className="font-serif text-lg">Вторая жизнь</span>
            </div>
            <h2 className="font-serif text-3xl mb-3">Украшения с историей</h2>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-sm">
              Каждое украшение — это пластик, который мог оказаться на свалке. 
              Мы даём ему вторую жизнь.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Logo mobile */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg text-foreground">Вторая жизнь</span>
          </div>

          <h1 className="font-serif text-3xl text-foreground mb-2">
            {mode === "login" ? "Войти в аккаунт" : "Создать аккаунт"}
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            {mode === "login" ? "Нет аккаунта? " : "Уже есть аккаунт? "}
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-primary hover:underline font-medium"
            >
              {mode === "login" ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <Label htmlFor="name" className="text-sm text-muted-foreground mb-1.5 block">Имя</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Анна"
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="email" className="text-sm text-muted-foreground mb-1.5 block">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="anna@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm text-muted-foreground mb-1.5 block">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="text-right">
                <button type="button" className="text-sm text-primary hover:underline">
                  Забыли пароль?
                </button>
              </div>
            )}

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2">
              {mode === "login" ? "Войти" : "Создать аккаунт"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

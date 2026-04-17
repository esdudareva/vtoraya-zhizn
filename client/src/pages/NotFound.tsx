/* NotFound page — Eco-Minimalism */
import { Link } from "wouter";
import { Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Leaf className="w-10 h-10 text-primary" />
        </div>
        <h1 className="font-serif text-6xl text-primary mb-4">404</h1>
        <h2 className="font-serif text-2xl text-foreground mb-3">Страница не найдена</h2>
        <p className="text-muted-foreground mb-8">
          Похоже, эта страница ушла на переработку. Но не волнуйтесь — 
          у нас есть много красивых украшений!
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              На главную <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/catalog">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              В каталог
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

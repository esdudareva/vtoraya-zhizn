import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Star, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function CommentsSection({ productId }: { productId: number }) {
  const [userName, setUserName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const { data: comments = [], refetch } = trpc.comments.listByProduct.useQuery({ productId });
  const submitComment = trpc.comments.submit.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !text) {
      toast.error("Заполните все поля");
      return;
    }

    setSubmitting(true);
    try {
      await submitComment.mutateAsync({ productId, userName, text, rating });
      toast.success("Комментарий отправлен на модерацию");
      setUserName("");
      setText("");
      setRating(5);
      void refetch();
    } catch {
      toast.error("Ошибка при отправке комментария");
    } finally {
      setSubmitting(false);
    }
  };

  const approvedComments = comments.filter((c: any) => c.approved === "approved");

  return (
    <div className="space-y-8">
      {/* Comments List */}
      <div>
        <h3 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Отзывы покупателей
        </h3>
        {approvedComments.length > 0 ? (
          <div className="space-y-4">
            {approvedComments.map((comment: any) => (
              <Card key={comment.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-foreground">{comment.userName}</p>
                    <p className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString("ru-RU")}</p>
                  </div>
                  {comment.rating && (
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= comment.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{comment.text}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">Пока нет одобренных комментариев</p>
        )}
      </div>

      {/* Add Comment Form */}
      <div className="bg-secondary rounded-lg p-6">
        <h4 className="font-medium text-foreground mb-4">Оставить комментарий</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Ваше имя"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            disabled={submitting}
          />
          <Textarea
            placeholder="Ваш комментарий"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitting}
            rows={4}
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Оценка:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-5 h-5 cursor-pointer transition-colors ${
                      s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300 hover:text-amber-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" disabled={submitting} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
            {submitting ? "Отправка..." : "Отправить комментарий"}
          </Button>
        </form>
      </div>
    </div>
  );
}

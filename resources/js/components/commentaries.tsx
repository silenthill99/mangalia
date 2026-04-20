import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { router, useHttp, usePage } from '@inertiajs/react';
import CommentaryController from '@/actions/App/Http/Controllers/CommentaryController';
import { login } from '@/routes';
import { Commentary, Manga, SharedData } from '@/types';

type Props = {
    article: Manga;
    commentaries: Commentary[];
    is_admin: boolean;
};

const Commentaries = ({ article, commentaries, is_admin }: Props) => {
    const { data, setData, errors, processing, post, delete: destroy } = useHttp({
        content: '',
    });
    const { auth } = usePage<SharedData>().props;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!auth.user) {
            router.visit(login());
            return;
        }
        post(CommentaryController.store(article).url, {
            onSuccess: () => {
                setData('content', '');
                router.reload({ only: ['commentaries'] });
            },
        });
    }

    return (
        <div className={'space-y-10'}>
            <form onSubmit={handleSubmit} className={'space-y-4'}>
                <Label htmlFor={'content'} className={'text-sm font-semibold tracking-wide text-zinc-200'}>
                    Ajouter un commentaire
                </Label>
                <Textarea
                    id={'content'}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    name={'content'}
                    rows={4}
                    placeholder={auth.user ? 'Partagez votre avis sur cet article...' : 'Connectez-vous pour commenter'}
                    className={
                        'resize-none border-white/20 bg-zinc-900/80 text-zinc-100 shadow-inner shadow-black/30 placeholder:text-zinc-400 focus-visible:border-violet-400/60 focus-visible:ring-violet-500/40'
                    }
                    disabled={!auth.user}
                />
                <InputError message={errors.content} />
                <div className={'flex justify-end pt-2'}>
                    <Button
                        disabled={processing}
                        className={
                            'bg-linear-to-r from-indigo-500 to-violet-600 px-6 text-white shadow-md shadow-violet-900/30 hover:from-indigo-600 hover:to-violet-700'
                        }
                    >
                        Envoyer
                    </Button>
                </div>
            </form>

            <div className={'space-y-5'}>
                {commentaries.length === 0 ? (
                    <div className={'rounded-xl border border-dashed border-white/10 bg-zinc-900/40 p-10 text-center backdrop-blur'}>
                        <p className={'text-sm text-zinc-400'}>Aucun commentaire pour le moment. Soyez le premier à réagir.</p>
                    </div>
                ) : (
                    commentaries.map((comment) => {
                        const canDelete = auth.user && (auth.user.id === comment.user.id || is_admin);
                        const initial = comment.user.name.charAt(0).toUpperCase();

                        return (
                            <article
                                key={comment.id}
                                className={'rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur transition-colors hover:border-violet-400/20'}
                            >
                                <header className={'mb-4 flex items-center gap-3'}>
                                    <span
                                        className={
                                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-md shadow-violet-900/30'
                                        }
                                    >
                                        {initial}
                                    </span>
                                    <p className={'font-semibold text-violet-200'}>{comment.user.name}</p>
                                </header>
                                <p className={'whitespace-pre-line text-zinc-300 leading-relaxed'}>{comment.content}</p>
                                {canDelete && (
                                    <div className={'mt-5 flex justify-end border-t border-white/5 pt-4'}>
                                        <button
                                            className={'cursor-pointer text-xs font-medium tracking-wide text-rose-400 uppercase transition-colors hover:text-rose-300'}
                                            onClick={() =>
                                                destroy(CommentaryController.destroy(comment).url, {
                                                    onSuccess: () => router.reload({ only: ['commentaries'] }),
                                                })
                                            }
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                )}
                            </article>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Commentaries;
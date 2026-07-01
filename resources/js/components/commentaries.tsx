// noinspection ShadcnAccessibility
// noinspection ShadcnAccessibility

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Form, router, usePage } from '@inertiajs/react';
import CommentaryController from '@/actions/App/Http/Controllers/CommentaryController';
import { Commentary, Manga } from '@/types';

type Props = {
    article: Manga;
    commentaries: Commentary[];
};

const Commentaries = ({ article, commentaries }: Props) => {
    const { auth } = usePage().props;
    const [editingId, setEditingId] = useState<number | null>(null);

    return (
        <div className={'space-y-10'}>
            <Form
                {...CommentaryController.store.form(article)}
                options={{ only: ['commentaries'], preserveScroll: true }}
                resetOnSuccess
                className={'space-y-4'}
            >
                {({ errors, processing }) => (
                    <>
                        <Label htmlFor={'content'} className={'text-sm font-semibold tracking-wide text-zinc-200'}>
                            Ajouter un commentaire
                        </Label>
                        <Textarea
                            id={'content'}
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
                    </>
                )}
            </Form>

            <div className={'space-y-5'}>
                {commentaries.length === 0 ? (
                    <div className={'rounded-xl border border-dashed border-white/10 bg-zinc-900/40 p-10 text-center backdrop-blur'}>
                        <p className={'text-sm text-zinc-400'}>Aucun commentaire pour le moment. Soyez le premier à réagir.</p>
                    </div>
                ) : (
                    commentaries.map((comment) => {
                        const canDelete = comment.can_delete;
                        const canUpdate = comment.can_update;
                        const isEditing = editingId === comment.id;
                        const initial = comment.user.name.charAt(0).toUpperCase();

                        return (
                            <article
                                key={comment.id}
                                className={
                                    'rounded-xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur transition-colors hover:border-violet-400/20'
                                }
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
                                {isEditing ? (
                                    <Form
                                        {...CommentaryController.update.form(comment)}
                                        options={{ only: ['commentaries'], preserveScroll: true }}
                                        onSuccess={() => setEditingId(null)}
                                        className={'space-y-3'}
                                    >
                                        {({ errors, processing }) => (
                                            <>
                                                <Label htmlFor={`content-${comment.id}`} className={'sr-only'}>
                                                    Modifier le commentaire
                                                </Label>
                                                <Textarea
                                                    id={`content-${comment.id}`}
                                                    name={'content'}
                                                    rows={3}
                                                    defaultValue={comment.content}
                                                    className={
                                                        'resize-none border-white/20 bg-zinc-900/80 text-zinc-100 shadow-inner shadow-black/30 focus-visible:border-violet-400/60 focus-visible:ring-violet-500/40'
                                                    }
                                                />
                                                <InputError message={errors.content} />
                                                <div className={'flex justify-end gap-4 pt-1'}>
                                                    <button
                                                        type={'button'}
                                                        className={
                                                            'cursor-pointer text-xs font-medium tracking-wide text-zinc-400 uppercase transition-colors hover:text-zinc-200'
                                                        }
                                                        onClick={() => setEditingId(null)}
                                                    >
                                                        Annuler
                                                    </button>
                                                    <Button
                                                        disabled={processing}
                                                        className={
                                                            'bg-linear-to-r from-indigo-500 to-violet-600 px-6 text-white shadow-md shadow-violet-900/30 hover:from-indigo-600 hover:to-violet-700'
                                                        }
                                                    >
                                                        Enregistrer
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </Form>
                                ) : (
                                    <p className={'leading-relaxed whitespace-pre-line text-zinc-300'}>{comment.content}</p>
                                )}
                                {!isEditing && (canUpdate || canDelete) && (
                                    <div className={'mt-5 flex justify-end gap-4 border-t border-white/5 pt-4'}>
                                        {canUpdate && (
                                            <button
                                                className={
                                                    'cursor-pointer text-xs font-medium tracking-wide text-violet-300 uppercase transition-colors hover:text-violet-200'
                                                }
                                                onClick={() => setEditingId(comment.id)}
                                            >
                                                Editer
                                            </button>
                                        )}
                                        {canDelete && (
                                            <button
                                                className={
                                                    'cursor-pointer text-xs font-medium tracking-wide text-rose-400 uppercase transition-colors hover:text-rose-300'
                                                }
                                                onClick={() =>
                                                    router.delete(CommentaryController.destroy(comment).url, {
                                                        only: ['commentaries'],
                                                        preserveScroll: true,
                                                    })
                                                }
                                            >
                                                Supprimer
                                            </button>
                                        )}
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

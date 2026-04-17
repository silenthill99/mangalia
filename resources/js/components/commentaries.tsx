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
}

const Commentaries = ({article, commentaries, is_admin}: Props) => {
    const { data, setData, errors, processing, post, delete: destroy } = useHttp({
        content: '',
    });
    const {auth} = usePage<SharedData>().props
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
        <div className={'space-y-6'}>
            <h2>Commentaires</h2>
            <form onSubmit={handleSubmit}>
                <Label htmlFor={'content'}>Ajouter un commentaire</Label>
                <Textarea
                    id={'content'}
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    name={'content'}
                    className={'resize-none'}
                    disabled={!auth.user}
                />
                <InputError message={errors.content} />
                <Button disabled={processing}>Envoyer</Button>
            </form>
            <div className={'space-y-4 divide-y'}>
                {commentaries.map((comment) => (
                    <div key={comment.id}>
                        <p className={'font-bold'}>{comment.user.name}</p>
                        <p>{comment.content}</p>
                        {auth.user && (auth.user.id === comment.user.id || is_admin) && (
                            <button className={"cursor-pointer text-red-400 hover:underline"} onClick={() => destroy(CommentaryController.destroy(comment).url, {
                                onSuccess: () => router.reload({ only: ['commentaries'] }),
                            })}>
                                Supprimer
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Commentaries;

import React, { useEffect, useRef, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Commentary, Manga, SharedData } from '@/types';
import { dashboard, home, login, register } from '@/routes';
import storage from '@/routes/storage';
import mangas from '@/routes/mangas';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import CommentaryController from "@/actions/App/Http/Controllers/CommentaryController";
import { Separator } from '@/components/ui/separator';

const Show = () => {

    const  { auth, article, menu, commentaries, is_admin } = usePage<SharedData & {article : Manga, menu: Manga[], commentaries: Commentary[]}>().props;

    const [showMenu, setShowMenu] = useState(false)

    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, []);

    const [dark, setDark] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        try {
            await axios.post(CommentaryController.store(article).url, Object.fromEntries(form))
            router.reload({only: ['commentaries']})
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={`grid lg:grid-cols-[25%_50%_25%] ${dark && "dark"} dark:bg-black dark:text-white`}>
            <Head title={article.title} />
            {/*Panneau de gauche*/}
            <div className={"hidden lg:flex h-screen sticky top-0 text-center flex-col items-center justify-center bg-white dark:bg-black gap-5"}>
                <Button variant={dark ? "secondary" : "default"} onClick={()=>setDark(!dark)}>Dark mode</Button>
                <h1 className={"pb-0"}>Mangalia</h1>
                <Link href={home()} className={"hover:underline"}>Retour à l'accueil</Link>
                <nav>
                    <ul>
                        {menu.map(({ id, title }) => (
                            <li key={id}>
                                <Link href={mangas.show({manga: id})} className={`hover:underline ${id === article.id && "font-bold"}`}>{title}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div ref={menuRef} className={"absolute left-5 bottom-5 flex flex-col items-start gap-2"}>
                    <nav className={`border rounded-lg bg-white shadow p-2 ${!showMenu && "hidden"}`}>
                        {auth.user ? (
                            <Link href={dashboard()}>Tableau de bord</Link>
                        ) : (
                            <ul>
                                <li>
                                    <Link href={login()}>Se connecter</Link>
                                </li>
                                <li>
                                    <Link href={register()}>Créer un compte</Link>
                                </li>
                            </ul>
                        )}
                    </nav>
                    <Button variant={"secondary"} onClick={() => {
                        setShowMenu(!showMenu)
                    }}>Profil</Button>
                </div>
            </div>

            {/*Panneau central*/}

            <section className={"lg:border-x min-h-screen px-5 lg:px-20 py-20 relative flex flex-col gap-8"}>
                <div>
                    <div className={'lg:hidden flex flex-col gap-5'}>
                        <h1 className={'py-0'}>{article.title}</h1>
                        <img className={'w-full rounded'} src={`/storage/${article.path}`} alt="" />
                        <p className={`font-bold ${article.age === "Tous publics" ? (
                            "text-green-700"
                        ) : (
                            "text-red-700"
                        )}`}>Restriction d'age : {article.age}</p>
                    </div>
                    <h1 className={"lg:pt-0"}>Résumé</h1>
                    <p className={"whitespace-pre-line text-justify"}>
                        {article.description}
                    </p>
                </div>
                <div className={"text-gray-500 flex flex-wrap justify-between gap-5 w-auto"}>
                    <p>Article ajouté le {new Date(article.created_at).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}</p>
                    {article.created_at !== article.updated_at && (
                        <p>Dernière modification le {new Date(article.updated_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}</p>
                    )}
                </div>
                <Separator/>

                {/*Section de commentaires*/}
                <div className={"space-y-6"}>
                    <h2>Commentaires</h2>
                    <form onSubmit={handleSubmit}>
                        <Label htmlFor={"content"}>Ajouter un commentaire</Label>
                        <Textarea id={'content'} name={"content"} className={"resize-none"} disabled={!auth.user}/>
                        <Button>Envoyer</Button>
                    </form>
                    <div className={"space-y-4 divide-y"}>
                        {commentaries.map((comment) => (
                            <div key={comment.id}>
                                <p className={"font-bold"}>{comment.user.name}</p>
                                <p>{comment.content}</p>
                                {auth.user && (auth.user.id === comment.user.id || is_admin) && (
                                    <Link href={CommentaryController.destroy(comment)} className={"text-red-400 hover:underline"}>Supprimer</Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/*Panneau de droite*/}

            <div className={"hidden lg:flex min-h-screen top-0 sticky p-5 flex-col items-center justify-center gap-10 bg-white dark:bg-black"}>
                <img src={storage.local(article.path).url} alt="" className={"w-full"}/>
                <h1>{article.title}</h1>
                <p className={`font-bold ${article.age === "Tous publics" ? (
                    "text-green-700"
                ) : (
                    "text-red-700"
                )}`}>Restriction d'age : {article.age}</p>
                <Button className={"bg-orange-600 p-2 text-white"}>Note : {article.note} / 20</Button>
            </div>
        </div>
    );
};

export default Show;

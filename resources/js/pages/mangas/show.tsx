import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { dashboard, home, login, register } from '@/routes';
import mangas from '@/routes/mangas';
import storage from '@/routes/storage';
import { Commentary, Manga, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import Commentaries from '@/components/commentaries';

const Show = () => {
    const { auth, article, menu, commentaries, is_admin } = usePage<SharedData & { article: Manga; menu: Manga[]; commentaries: Commentary[] }>()
        .props;

    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [dark, setDark] = useState(false);



    return (
        <div className={`grid lg:grid-cols-[25%_50%_25%] ${dark && 'dark'} dark:bg-black dark:text-white`}>
            <Head title={article.title} />
            {/*Panneau de gauche*/}
            <div className={'sticky top-0 hidden h-screen flex-col items-center justify-center gap-5 bg-white text-center lg:flex dark:bg-black'}>
                <Button variant={dark ? 'secondary' : 'default'} onClick={() => setDark(!dark)}>
                    Dark mode
                </Button>
                <h1 className={'pb-0'}>Mangalia</h1>
                <Link href={home()} className={'hover:underline'}>
                    Retour à l'accueil
                </Link>
                <nav>
                    <ul>
                        {menu.map(({ id, title }) => (
                            <li key={id}>
                                <Link href={mangas.show({ manga: id })} className={`hover:underline ${id === article.id && 'font-bold'}`}>
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div ref={menuRef} className={'absolute bottom-5 left-5 flex flex-col items-start gap-2'}>
                    <nav className={`rounded-lg border bg-white p-2 shadow ${!showMenu && 'hidden'}`}>
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
                    <Button
                        variant={'secondary'}
                        onClick={() => {
                            setShowMenu(!showMenu);
                        }}
                    >
                        Profil
                    </Button>
                </div>
            </div>

            {/*Panneau central*/}

            <section className={'relative flex min-h-screen flex-col gap-8 px-5 py-20 lg:border-x lg:px-20'}>
                <div>
                    <div className={'flex flex-col gap-5 lg:hidden'}>
                        <h1 className={'py-0'}>{article.title}</h1>
                        <img className={'w-full rounded'} src={`/storage/${article.path}`} alt="" />
                        <p className={`font-bold ${article.age === 'Tous publics' ? 'text-green-700' : 'text-red-700'}`}>
                            Restriction d'age : {article.age}
                        </p>
                    </div>
                    <h1 className={'lg:pt-0'}>Résumé</h1>
                    <p className={'text-justify whitespace-pre-line'}>{article.description}</p>
                </div>
                <div className={'flex w-auto flex-wrap justify-between gap-5 text-gray-500'}>
                    <p>
                        Article ajouté le{' '}
                        {new Date(article.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </p>
                    {article.created_at !== article.updated_at && (
                        <p>
                            Dernière modification le{' '}
                            {new Date(article.updated_at).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                    )}
                </div>
                <Separator />

                {/*Section de commentaires*/}
                <Commentaries article={article} commentaries={commentaries} is_admin={is_admin || false} />
            </section>

            {/*Panneau de droite*/}

            <div className={'sticky top-0 hidden min-h-screen flex-col items-center gap-10 bg-white p-5 lg:flex dark:bg-black'}>
                <img src={storage.local(article.path).url} alt="" className={'w-full'} />
                <h1 className={'text-center'}>{article.title}</h1>
                <p className={`font-bold ${article.age === 'Tous publics' ? 'text-green-700' : 'text-red-700'}`}>Restriction d'age : {article.age}</p>
                <Button className={'bg-orange-600 p-2 text-white'}>Note : {article.note} / 20</Button>
            </div>
        </div>
    );
};

export default Show;

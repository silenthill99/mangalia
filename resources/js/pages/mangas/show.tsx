import { Badge } from '@/components/ui/badge';
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

    return (
        <div className={'relative grid min-h-screen bg-zinc-950 text-zinc-100 lg:grid-cols-[25%_50%_25%]'}>
            <Head title={article.title} />

            {/* Halftone + glows ambiance manga */}
            <div
                aria-hidden
                className={'pointer-events-none fixed inset-0 opacity-[0.035]'}
                style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />
            <div aria-hidden className={'pointer-events-none fixed -top-40 -left-40 h-112 w-md rounded-full bg-indigo-700/10 blur-3xl'} />
            <div aria-hidden className={'pointer-events-none fixed top-40 right-0 h-112 w-md rounded-full bg-violet-700/10 blur-3xl'} />

            {/*Panneau de gauche*/}
            <div
                className={
                    'sticky top-0 z-10 hidden h-screen flex-col items-center justify-center gap-6 border-r border-white/10 bg-zinc-950/70 p-5 text-center backdrop-blur-xl lg:flex'
                }
            >
                <Link href={home()} className={'group flex flex-col items-center gap-1'}>
                    <span
                        className={
                            'bg-linear-to-r from-indigo-300 via-violet-300 to-sky-300 bg-clip-text text-3xl font-black tracking-tight text-transparent'
                        }
                    >
                        MANGALIA
                    </span>
                    <span className={'text-[0.65rem] font-bold tracking-[0.3em] text-zinc-500 transition-colors group-hover:text-violet-300'}>
                        マンガリア
                    </span>
                </Link>
                <Link href={home()} className={'text-sm text-zinc-400 transition-colors hover:text-violet-300'}>
                    ← Retour à l'accueil
                </Link>
                <nav className={'w-full px-2'}>
                    <div className={'mb-3 flex items-center gap-3'}>
                        <span className={'h-5 w-1 rounded-full bg-linear-to-b from-indigo-500 to-violet-600'} />
                        <h2 className={'text-xs font-bold tracking-[0.2em] text-zinc-300 uppercase'}>Articles</h2>
                    </div>
                    <ul className={'flex flex-col gap-1 text-left'}>
                        {menu.map(({ id, title }) => (
                            <li key={id}>
                                <Link
                                    href={mangas.show({ manga: id })}
                                    className={`block truncate rounded-md px-3 py-1.5 text-sm transition-colors ${
                                        id === article.id
                                            ? 'bg-violet-500/10 font-bold text-violet-200 ring-1 ring-violet-400/30'
                                            : 'text-zinc-400 hover:bg-white/5 hover:text-violet-300'
                                    }`}
                                >
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div ref={menuRef} className={'absolute bottom-5 left-5 flex flex-col items-start gap-2'}>
                    <nav
                        className={`rounded-lg border border-white/10 bg-zinc-900/90 p-2 shadow-lg shadow-violet-900/20 backdrop-blur ${!showMenu && 'hidden'}`}
                    >
                        {auth.user ? (
                            <Link href={dashboard()} className={'block px-2 py-1 text-sm text-zinc-300 transition-colors hover:text-violet-300'}>
                                Tableau de bord
                            </Link>
                        ) : (
                            <ul className={'flex flex-col'}>
                                <li>
                                    <Link href={login()} className={'block px-2 py-1 text-sm text-zinc-300 transition-colors hover:text-violet-300'}>
                                        Se connecter
                                    </Link>
                                </li>
                                <li>
                                    <Link href={register()} className={'block px-2 py-1 text-sm text-zinc-300 transition-colors hover:text-violet-300'}>
                                        Créer un compte
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </nav>
                    <Button
                        onClick={() => {
                            setShowMenu(!showMenu);
                        }}
                        className={
                            'bg-linear-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-violet-900/30 hover:from-indigo-600 hover:to-violet-700'
                        }
                    >
                        Profil
                    </Button>
                </div>
            </div>

            {/*Panneau central*/}

            <section className={'relative flex min-h-screen flex-col gap-8 px-5 py-20 lg:border-x lg:border-white/10 lg:px-20'}>
                <div>
                    <div className={'flex flex-col gap-5 lg:hidden'}>
                        <h1
                            className={
                                'bg-linear-to-r from-indigo-300 via-violet-300 to-sky-300 bg-clip-text text-4xl font-black tracking-tight text-transparent'
                            }
                        >
                            {article.title}
                        </h1>
                        <img className={'w-full rounded-xl ring-1 ring-white/10'} src={`/storage/${article.path}`} alt="" />
                        <Badge
                            className={`w-fit border-0 ${
                                article.age === 'Tous publics'
                                    ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30'
                                    : 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30'
                            }`}
                        >
                            Restriction d'age : {article.age}
                        </Badge>
                    </div>
                    <div className={'mb-6 flex items-center gap-3 lg:pt-0'}>
                        <span className={'h-8 w-1.5 rounded-full bg-linear-to-b from-indigo-500 to-violet-600'} />
                        <h2 className={'text-3xl font-black tracking-tight text-white md:text-4xl'}>Résumé</h2>
                    </div>
                    <p className={'text-justify whitespace-pre-line text-zinc-300'}>{article.description}</p>
                </div>
                <div className={'flex w-auto flex-wrap justify-between gap-5 text-sm text-zinc-500'}>
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
                <Separator className={'bg-white/10'} />

                {/*Section de commentaires*/}
                <div>
                    <div className={'mb-6 flex items-center gap-3'}>
                        <span className={'h-8 w-1.5 rounded-full bg-linear-to-b from-indigo-500 to-violet-600'} />
                        <h2 className={'text-3xl font-black tracking-tight text-white md:text-4xl'}>Commentaires</h2>
                    </div>
                    <Commentaries article={article} commentaries={commentaries} is_admin={is_admin || false} />
                </div>
            </section>

            {/*Panneau de droite*/}

            <div
                className={
                    'sticky top-0 z-10 hidden min-h-screen flex-col items-center gap-6 border-l border-white/10 bg-zinc-950/70 p-6 backdrop-blur-xl lg:flex'
                }
            >
                <div className={'relative w-full overflow-hidden rounded-xl ring-1 ring-white/10 shadow-xl shadow-violet-900/30'}>
                    <img src={storage.local(article.path).url} alt="" className={'w-full object-cover'} />
                    <div className={'pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/80 via-transparent to-transparent'} />
                </div>
                <h1
                    className={
                        'bg-linear-to-r from-indigo-300 via-violet-300 to-sky-300 bg-clip-text text-center text-2xl font-black tracking-tight text-transparent'
                    }
                >
                    {article.title}
                </h1>
                <Badge
                    className={`border-0 ${
                        article.age === 'Tous publics'
                            ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30'
                            : 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30'
                    }`}
                >
                    Restriction d'age : {article.age}
                </Badge>
                <Button
                    className={
                        'w-full bg-linear-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-violet-900/30 hover:from-indigo-600 hover:to-violet-700'
                    }
                >
                    Note : {article.note} / 20
                </Button>
            </div>
        </div>
    );
};

export default Show;

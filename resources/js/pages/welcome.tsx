import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import mangas from '@/routes/mangas';
import { Manga, SharedData } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const { auth, articles } = usePage<SharedData & { articles: Manga[] }>().props;

    return (
        <div className={'relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100'}>
            <Head title="Page d'accueil">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>

            {/* Halftone + glows ambiance manga */}
            <div
                aria-hidden
                className={'pointer-events-none absolute inset-0 opacity-[0.035]'}
                style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />
            <div aria-hidden className={'pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-indigo-700/10 blur-3xl'} />
            <div aria-hidden className={'pointer-events-none absolute top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-violet-700/10 blur-3xl'} />

            {/* Barre de navigation */}
            <header className={'sticky top-0 z-20 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl'}>
                <div className={'container mx-auto flex items-center justify-between px-6 py-4'}>
                    <Link href="/" className={'group flex items-center gap-3'}>
                        <span
                            className={
                                'bg-linear-to-r from-indigo-300 via-violet-300 to-sky-300 bg-clip-text text-2xl font-black tracking-tight text-transparent'
                            }
                        >
                            MANGALIA
                        </span>
                        <span className={'hidden text-xs font-bold tracking-[0.3em] text-zinc-500 transition-colors group-hover:text-violet-300 sm:inline'}>
                            マンガリア
                        </span>
                    </Link>
                    <nav className={'flex items-center gap-2'}>
                        {auth.user ? (
                            <Button
                                asChild
                                className={
                                    'bg-linear-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-violet-900/30 hover:from-indigo-600 hover:to-violet-700'
                                }
                            >
                                <Link href={dashboard()}>Page admin</Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild variant={'ghost'} className={'text-zinc-300 hover:bg-white/5 hover:text-white'}>
                                    <Link href={login()}>Se connecter</Link>
                                </Button>
                                <Button
                                    asChild
                                    className={
                                        'bg-linear-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-violet-900/30 hover:from-indigo-600 hover:to-violet-700'
                                    }
                                >
                                    <Link href={register()}>Créer un compte</Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className={'relative container mx-auto px-6 py-24 text-center'}>
                {/* Kana décoratif en arrière-plan */}
                <div
                    aria-hidden
                    className={
                        'pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 text-[8rem] leading-none font-black text-white/[0.03] select-none md:text-[14rem]'
                    }
                >
                    アニメ
                </div>

                <Badge className={'relative mb-6 border border-violet-400/20 bg-violet-500/5 text-violet-200 backdrop-blur'}>
                    ✦ Critiques d'animés, mangas & films d'animation
                </Badge>
                <h1 className={'relative mx-auto max-w-4xl text-5xl leading-[1.05] font-black tracking-tight md:text-7xl'}>
                    Bienvenue sur{' '}
                    <span className={'bg-linear-to-r from-indigo-300 via-violet-300 to-sky-300 bg-clip-text text-transparent'}>Mangalia</span>
                </h1>
                <p className={'relative mx-auto mt-8 max-w-2xl text-lg text-zinc-400'}>
                    Tous les genres, tous les studios. Partagez vos critiques d'animés et de films d'animation japonais — du shonen au seinen, du slice-of-life au
                    mecha.
                </p>
            </section>

            {/* Grille d'articles */}
            <section className={'relative container mx-auto px-6 pb-24'}>
                {articles.length > 0 ? (
                    <>
                        <div className={'mb-10 flex items-end justify-between border-b border-white/10 pb-6'}>
                            <div className={'flex items-center gap-4'}>
                                <span className={'h-8 w-1.5 rounded-full bg-linear-to-b from-indigo-500 to-violet-600'} />
                                <h2 className={'text-3xl font-black tracking-tight text-white md:text-4xl'}>Derniers articles</h2>
                            </div>
                            <span className={'text-sm font-medium text-zinc-500'}>
                                {articles.length} article{articles.length > 1 ? 's' : ''}
                            </span>
                        </div>
                        <div className={'grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
                            {articles.map(
                                (article) =>
                                    article.path && (
                                        <Link
                                            key={article.id}
                                            href={mangas.show({ manga: article.id })}
                                            className={
                                                'group relative flex flex-col overflow-hidden rounded-xl bg-zinc-900/70 ring-1 ring-white/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-900/30 hover:ring-violet-400/30'
                                            }
                                        >
                                            <div className={'relative aspect-3/4 overflow-hidden'}>
                                                <img
                                                    src={`/storage/${article.path.replace('public/', '')}`}
                                                    alt={article.title}
                                                    className={'h-full w-full object-cover transition duration-500 group-hover:scale-110'}
                                                />
                                                <div className={'absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent'} />
                                                <Badge
                                                    className={
                                                        'absolute top-3 right-3 border-0 bg-linear-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-violet-900/40'
                                                    }
                                                >
                                                    {article.note} / 20
                                                </Badge>
                                            </div>
                                            <div className={'flex flex-1 flex-col justify-between gap-3 p-5'}>
                                                <h3 className={'line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-violet-200'}>
                                                    {article.title}
                                                </h3>
                                                <span className={'inline-flex items-center gap-1 text-sm font-semibold text-violet-300'}>
                                                    Voir plus de détails
                                                    <span className={'transition-transform duration-300 group-hover:translate-x-1'}>→</span>
                                                </span>
                                            </div>
                                        </Link>
                                    ),
                            )}
                        </div>
                    </>
                ) : (
                    <div className={'rounded-xl border border-dashed border-white/15 bg-zinc-900/50 p-16 text-center backdrop-blur'}>
                        <p className={'text-lg text-zinc-400'}>Aucun article pour le moment.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
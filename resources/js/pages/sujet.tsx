import React, { useEffect, useRef, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { SharedData } from '@/types';

type ArticleProps = {
    id: number;
    title: string;
    path: string;
    price: string;
    description: string;
    age: string
}

const Sujet = () => {

    const  { auth, article, menu } = usePage<SharedData & {article : ArticleProps, menu: ArticleProps[]}>().props;

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

    return (
        <div className={"grid lg:grid-cols-[25%_50%_25%]"}>
            <Head title={article.title} />
            <div className={"hidden lg:flex h-screen sticky top-0 text-center flex-col items-center justify-center bg-white gap-5"}>
                <h1 className={"pb-0"}>Mangalia</h1>
                <Link href={route('home')} className={"hover:underline"}>Retour à l'accueil</Link>
                <nav>
                    <ul>
                        {menu.map(({ id, title }) => (
                            <>
                                <li key={id}>
                                    <Link href={route('sujet', id)} className={`hover:underline ${id === article.id && "font-bold"}`}>{title}</Link>
                                </li>
                            </>
                        ))}
                    </ul>
                </nav>
                <div ref={menuRef} className={"absolute left-5 bottom-5 flex flex-col items-start gap-2"}>
                    <nav className={`border rounded-lg bg-white shadow p-2 ${!showMenu && "hidden"}`}>
                        {auth.user ? (
                            <Link href={route("dashboard")}>Tableau de bord</Link>
                        ) : (
                            <ul>
                                <li>
                                    <Link href={route('login')}>Se connecter</Link>
                                </li>
                                <li>
                                    <Link href={route('register')}>Créer un compte</Link>
                                </li>
                            </ul>
                        )}
                    </nav>
                    <Button variant={"secondary"} onClick={() => {
                        setShowMenu(!showMenu)
                    }}>Profil</Button>
                </div>
            </div>
            <div className={"md:border-x border-gray-300 min-h-screen px-5 lg:px-20 pb-20"}>
                <h1>Résumé</h1>
                <p className={"whitespace-pre-line"}>
                    {article.description}
                </p>
            </div>
            <div className={"hidden lg:flex h-screen top-0 sticky p-5 flex-col items-center justify-center gap-10 bg-white"}>
                <img src={`/storage/${article.path.replace("public/", "")}`} alt="" className={"w-full"}/>
                <h1>{article.title}</h1>
                <p className={`font-bold ${article.age === "Tous publics" ? (
                    "text-green-700"
                ) : (
                    "text-red-700"
                )}`}>Restriction d'age : {article.age}</p>
                <Button className={"bg-orange-600 p-2 text-white"}>Prix : {article.price} €</Button>
            </div>
        </div>
    );
};

export default Sujet;

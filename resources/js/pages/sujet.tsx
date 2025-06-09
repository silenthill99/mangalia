import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

type ArticleProps = {
    id: number;
    title: string;
    path: string;
    description: string;
    age: string
}

const Sujet = () => {

    const  { article, menu } = usePage<{article : ArticleProps, menu: ArticleProps[]}>().props;

    return (
        <div className={"grid lg:grid-cols-[25%_50%_25%]"}>
            <Head title={article.title} />
            <div className={"hidden lg:flex flex-col items-center justify-center"}>
                <h1>Mangalia</h1>
                <nav className={"flex"}>
                    <ul>
                        <Link href={route('home')} className={"hover:underline mt-5"}>Retour à l'accueil</Link>
                        {menu.map(({ id, title }) => (
                            <li key={id}>
                                <Link href={route('sujet', id)} className={`hover:underline ${id === article.id && "font-bold"}`}>{title}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className={"border-x border-gray-300 min-h-screen"}>
                {article.description}
            </div>
            <div className={"hidden lg:flex flex-col items-center justify-center p-5"}>
                <h1>{article.title}</h1>
                <img src={`/storage/${article.path.replace("public/", "")}`} alt="" className={"w-full"}/>
                <p className={`font-bold ${article.age === "Tous publics" ? (
                    "text-green-600"
                ) : (
                    "text-red-600"
                )}`}>Restriction : {article.age}</p>
            </div>
        </div>
    );
};

export default Sujet;

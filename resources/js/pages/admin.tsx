import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type ArticleProps = {
    id: number;
    path: string;
    title: string;
    price: number;
}

const Admin = () => {
    const {articles} = usePage<{articles: ArticleProps[]}>().props
    return (
        <div className="container mx-auto">
            <Head title={'Page Admin'} />
            <h1>Page admin</h1>
            <Link href={route('home')}>Retour à l'accueil</Link> <br/>
            <a href="" className={"inline-block bg-emerald-400 p-5 rounded-2xl mt-10 mb-20 text-white hover:bg-emerald-950 duration-300"}>
                Ajouter un article
            </a>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>id</TableHead>
                        <TableHead>image</TableHead>
                        <TableHead>Titre</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead className={'text-center'}>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {articles.map((article) => (
                        article.path && (
                            <TableRow key={article.id}>
                                <TableCell>{article.id}</TableCell>
                                <TableCell className={"w-30"}><img src={`/storage/${article.path.replace('public/', '')}`} alt={article.title} /></TableCell>
                                <TableCell>{article.title}</TableCell>
                                <TableCell>{article.price}</TableCell>
                                <TableCell>
                                    <ul className={"flex justify-center gap-2"}>
                                        <li><a href="">Voir</a></li>
                                        <li><a href="">Modifier</a></li>
                                    </ul>
                                </TableCell>
                            </TableRow>
                        )
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Admin;

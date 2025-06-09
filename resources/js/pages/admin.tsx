import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type ArticleProps = {
    id: number;
    path: string;
    title: string;
    price: number;
}

type FlashProps = {
    success: string;
}

const Admin = () => {
    const {articles, flash} = usePage<{articles: ArticleProps[], flash: FlashProps}>().props

    const { delete: destroy } = useForm();

    return (
        <div className="container mx-auto">
            <Head title={'Page Admin'} />
            <h1>Page admin</h1>
            {flash?.success && (
                <p>
                    {flash.success}
                </p>
            )}
            <Link href={route('home')}>Retour à l'accueil</Link> <br/>
            <Link href={route('ajout')} className={"inline-block bg-accent-bis p-5 rounded-2xl mt-10 mb-20 text-white hover:bg-emerald-950 duration-300"}>
                Ajouter un article
            </Link>
            {articles.length > 0 ? (
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
                                            <li><Link href={route("sujet", article.id)}>Voir</Link></li>
                                            <li><Link href={route("update", article.id)}>Modifier</Link></li>
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        if (confirm(`Supprimer l'article "${article.title}" ?`)) {
                                                            destroy(route('admin-delete', article.id));
                                                        }
                                                    }}
                                                    className="text-red-600 hover:underline"
                                                >
                                                    Supprimer
                                                </button>
                                            </li>
                                        </ul>
                                    </TableCell>
                                </TableRow>
                            )
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p className={"text-red-600"}>Aucun articles actuellement</p>
            )}
        </div>
    );
};

export default Admin;

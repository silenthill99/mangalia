import AppLayout from '@/layouts/app-layout';
import { Article, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';
import mangas from '@/routes/mangas';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tableau de bord',
        href: '/dashboard',
    },
];
type FlashProps = {
    success: string;
}

export default function Dashboard() {
    const {articles, flash} = usePage<{articles: Article[], flash: FlashProps}>().props

    const { delete: destroy } = useForm();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className={"p-5"}>
                <h1>Page admin</h1>
                {flash?.success && (
                    <p>
                        {flash.success}
                    </p>
                )}
                <Link href={mangas.create()} className={"inline-block bg-accent-bis p-5 rounded-2xl mt-10 mb-20 text-white hover:bg-emerald-950 duration-300 w-42"}>
                    Ajouter un article
                </Link>
                {articles.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>id</TableHead>
                                <TableHead>image</TableHead>
                                <TableHead>Titre</TableHead>
                                <TableHead>Prix (en €)</TableHead>
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
                                                <li><Link href={mangas.show({ manga: article.id })} className={"hover:underline"}>Voir</Link></li>
                                                <li><Link href={mangas.edit({manga: article.id})} className={"hover:underline"}>Modifier</Link></li>
                                                <li>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm(`Supprimer l'article "${article.title}" ?`)) {
                                                                destroy(mangas.destroy({ id: article.id }).url);
                                                            }
                                                        }}
                                                        className="text-red-600 hover:underline cursor-pointer"
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
        </AppLayout>
    );
}

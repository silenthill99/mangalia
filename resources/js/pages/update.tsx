import React, { FormEvent, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';

type ArticleProps = {
    id: number;
    title: string;
    price: number;
    age: string;
    description: string;
    path: string; // chemin actuel de l'image
};

const Update = () => {
    const { article } = usePage<{ article: ArticleProps }>().props;

    const [fileName, setFileName] = useState("Choisir une image");
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, put, reset } = useForm({
        title: article.title,
        price: article.price,
        age: article.age,
        description: article.description,
        image: null as File | null,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData: any = { ...data };

        // ⚠️ si aucune nouvelle image, on ne l'envoie pas
        if (!formData.image) {
            delete formData.image;
        }

        put(`/update/${article.id}`, formData, {
            forceFormData: true,
            onSuccess: () => reset(),
            onError: (errors) => console.error("❌ Erreurs", errors),
            onFinish: () => console.log("✅ Terminé"),
        });
    };

    return (
        <div className="container mx-auto flex min-h-screen items-center justify-center">
            <Head title="Update" />
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="w-full max-w-lg border p-5 rounded shadow">
                <label htmlFor="title">Titre</label>
                <input
                    type="text"
                    id="title"
                    value={data.title}
                    onChange={e => setData("title", e.target.value)}
                    className="w-full border mb-4"
                />

                <label htmlFor="image" className="bg-blue-500 text-white p-3 rounded cursor-pointer inline-block">
                    {fileName}
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setData("image", file);
                                setFileName(file.name);
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                </label>

                <label htmlFor="price">Prix</label>
                <input
                    type="number"
                    id="price"
                    value={data.price}
                    onChange={e => setData("price", parseFloat(e.target.value))}
                    className="w-full border mb-4"
                />

                <label htmlFor="age">Âge</label>
                <select
                    id="age"
                    value={data.age}
                    onChange={e => setData("age", e.target.value)}
                    className="w-full border mb-4"
                >
                    <option value="" disabled>-- Choisissez une restriction --</option>
                    <option value="Tous publics">Tous publics</option>
                    <option value="12+">12+</option>
                    <option value="16+">16+</option>
                    <option value="18+">18+</option>
                </select>

                <label htmlFor="description">Résumé</label>
                <textarea
                    id="description"
                    value={data.description}
                    onChange={e => setData("description", e.target.value)}

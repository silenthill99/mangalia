import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Article = {
    id: number;
    title: string;
    price: number;
    age: string;
    description: string;
    path: string;
};

export default function Update() {
    const { manga, errors } = usePage<{ manga: Article; errors: Record<string, string> }>().props;

    const { data, setData, post } = useForm({
        title: manga.title,
        image: null as File | null,
        price: manga.price,
        age: manga.age,
        description: manga.description,
    });

    const [fileName, setFileName] = useState("Changer l'image");
    const [preview, setPreview] = useState<string | null>(`/storage/${manga.path.replace('public/', '')}`);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('update.submit', manga.id), {
            forceFormData: true,
            preserveScroll: true
        });
    };

    return (
        <div className={'container mx-auto flex min-h-screen items-center justify-center'}>
            <Head title={'Modifier un article'} />
            <form onSubmit={handleSubmit} className={'my-5 w-9/10 rounded border border-gray-300 p-5 md:w-auto'}>
                <label htmlFor="title">Titre</label>
                <input
                    type="text"
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="ml-2 border border-gray-300 focus:outline-none"
                    required
                />
                <br /><br />

                <label htmlFor="image" className={'bg-accent-bis inline-block cursor-pointer rounded p-5 text-white shadow'}>
                    <span>{fileName}</span>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setData('image', file);
                                setPreview(URL.createObjectURL(file));
                                setFileName(file.name);
                            }
                        }}
                        className="hidden"
                    />
                </label>

                {preview && <div className="mt-4"><img src={preview} alt="Preview" className="max-h-64 rounded" /></div>}
                {errors.image && <p className="text-red-600">{errors.image}</p>}
                <br /><br />

                <label htmlFor="price">Prix</label>
                <input
                    type="number"
                    id="price"
                    value={data.price}
                    onChange={(e) => setData('price', parseFloat(e.target.value))}
                    className="ml-2 border border-gray-300 focus:outline-none"
                    required
                />
                <br /><br />

                <label htmlFor="age">Âge</label>
                <select
                    id="age"
                    value={data.age}
                    onChange={(e) => setData('age', e.target.value)}
                    className="border border-gray-300"
                    required
                >
                    <option value="">--Choisissez une valeur--</option>
                    <option value="Tous publics">Tous publics</option>
                    <option value="12+">12+</option>
                </select>
                <br /><br />

                <label htmlFor="description">Résumé</label><br />
                <textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="w-full lg:w-100 h-100 resize-none border border-gray-300 focus:outline-none"
                    required
                />
                <br /><br />

                <input type="submit" value="Mettre à jour" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" />
            </form>
        </div>
    );
}

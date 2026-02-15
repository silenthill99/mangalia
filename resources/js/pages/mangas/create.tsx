import MangaController from '@/actions/App/Http/Controllers/MangaController';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { dashboard } from '@/routes';
import { Form, Head, router } from '@inertiajs/react';
import { useState } from 'react';

const Create = () => {
    const [fileName, setFileName] = useState('Choisir une image');

    const [preview, setPreview] = useState<string | null>(null);

    return (
        <div className={'container mx-auto flex min-h-screen items-center justify-center'}>
            <Head title={'Ajouter un article'} />
            <Form {...MangaController.store.form()} resetOnSuccess className={'my-5 w-9/10 rounded border border-gray-300 p-5 md:w-auto'}>
                {({ errors }) => (
                    <div className={'space-y-4'}>
                        <div className={'flex items-center justify-between'}>
                            <Label htmlFor="title">Ajouter un titre</Label>
                            <div className={"text-right"}>
                                <Input
                                    type="text"
                                    name={'title'}
                                    id={'title'}
                                    placeholder={"Titre de l'article"}
                                    className={'w-auto border pr-2 text-right focus:outline-none'}
                                />
                                <InputError message={errors.title} />
                            </div>
                        </div>
                        <div>
                            <Label
                                htmlFor="image"
                                className={'bg-accent-bis inline-block w-full cursor-pointer rounded p-5 text-center text-white shadow'}
                            >
                                <span>{fileName}</span>
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    accept={'image/*'}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setPreview(URL.createObjectURL(file));
                                            setFileName(file.name);
                                        }
                                    }}
                                    className={'hidden'}
                                />
                            </Label>
                            {preview && <img src={preview} alt={'Preview'} className={'mt-5 max-w-full rounded lg:max-w-2xl'} />}
                            <InputError message={errors.image} />
                        </div>
                        <div className={'flex items-center justify-between'}>
                            <Label htmlFor="note">Note sur 20</Label>
                            <div className={'text-right'}>
                                <Input
                                    type="number"
                                    name="note"
                                    id="note"
                                    placeholder={'Note sur 20'}
                                    className={'w-auto border text-right focus:outline-none'}
                                />
                                <InputError message={errors.image} />
                            </div>
                        </div>
                        <div>
                            <Select name="age">
                                <SelectTrigger className={'w-full border text-center focus:outline-none'}>
                                    <SelectValue placeholder={'--Choisissez une valeur--'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value={'Tous publics'}>Tous publics</SelectItem>
                                        <SelectItem value={'12 +'}>12 +</SelectItem>
                                        <SelectItem value={'16 +'}>16 +</SelectItem>
                                        <SelectItem value={'18 +'}>18 +</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.age} />
                        </div>
                        <div>
                            <Label htmlFor="description">Résumé</Label>
                            <Textarea
                                name="description"
                                id="description"
                                className={'h-100 w-full resize-none border p-2 text-justify focus:outline-none lg:w-2xl'}
                            />
                            <InputError message={errors.description} />
                        </div>
                        <div className={'flex justify-between'}>
                            <input
                                type="submit"
                                value="Valider"
                                className={'cursor-pointer rounded bg-black p-2 text-white duration-300 hover:bg-gray-600 active:bg-gray-800'}
                            />
                            <button
                                type={'button'}
                                onClick={() => {
                                    if (confirm('Voulez-vous continuer ? Toutes les modifications apportées seront perdues')) {
                                        router.visit(dashboard());
                                    }
                                }}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                )}
            </Form>
        </div>
    );
};

export default Create;

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('mangas', function (Blueprint $table) {
            if (! Schema::hasColumn('mangas', 'slug')) {
                $table->string('slug')->after('title');
            }
        });

        $hasUniqueSlug = collect(Schema::getIndexes('mangas'))
            ->contains(fn (array $index): bool => $index['unique'] && in_array('slug', $index['columns']));

        if (! $hasUniqueSlug) {
            Schema::table('mangas', function (Blueprint $table) {
                $table->unique('slug');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mangas', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};

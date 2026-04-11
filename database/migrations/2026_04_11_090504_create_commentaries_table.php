<?php

use App\Models\Commentary;
use App\Models\Manga;
use App\Models\User;
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
        Schema::create('commentaries', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignIdFor(Manga::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->text('content');
            $table->timestamps();
        });

        Schema::create('commentary_reactions', function (Blueprint $table) {
            $table->foreignIdFor(Commentary::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->enum('type', ['like', 'dislike'])->default('like');

            $table->primary(['commentary_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commentary_reactions');
        Schema::dropIfExists('commentaries');
    }
};

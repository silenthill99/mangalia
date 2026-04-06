<?php

namespace App\Providers;

use App\Enum\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
        Model::preventLazyLoading();
        JsonResource::withoutWrapping();
        Gate::define('isAdmin', function ($user) {
            return $user->role()->is(Role::where('level', RoleEnum::Administrateur->level())->first());
        });
    }
}

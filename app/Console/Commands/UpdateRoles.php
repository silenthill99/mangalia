<?php

namespace App\Console\Commands;

use App\Enum\RoleEnum;
use App\Models\Role;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('app:update_roles')]
#[Description('Command description')]
class UpdateRoles extends Command
{
    /**
     * Execute the console command.
     */
    public function handle()
    {
        $roles = array_map(function (RoleEnum $role) {
            return [
                'code' => $role->value,
                'label' => $role->label(),
                'level' => $role->level(),
            ];
        }, RoleEnum::cases());

        Role::upsert($roles,
            uniqueBy: ['code'],
            update: ['level', 'label']
        );
    }
}

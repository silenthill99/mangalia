<?php

namespace App\Enum;

enum RoleEnum: string
{
    case Membre = 'member';
    case Administrateur = 'admin';

    public function label(): string
    {
        return match ($this) {
            self::Membre => 'Membre',
            self::Administrateur => 'Administrateur',
        };
    }

    public function level(): int
    {
        return match ($this) {
            self::Membre => 1,
            self::Administrateur => 2,
        };
    }
}

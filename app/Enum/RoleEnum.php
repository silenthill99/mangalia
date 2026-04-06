<?php

namespace App\Enum;

enum RoleEnum: string
{
    case Membre = "Membre";
    case Administrateur = "Administrateur";

    public function level(): int
    {
        return match ($this) {
            self::Membre => 1,
            self::Administrateur => 2,
        };
    }
}

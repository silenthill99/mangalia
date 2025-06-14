-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : jeu. 12 juin 2025 à 14:08
-- Version du serveur : 8.0.35-0ubuntu0.22.04.1
-- Version de PHP : 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mangalia`
--

-- --------------------------------------------------------

--
-- Structure de la table `mangas`
--

CREATE TABLE `mangas` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `age` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `mangas`
--

INSERT INTO `mangas` (`id`, `title`, `path`, `price`, `age`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Made in abyss', 'images/1749554548_made in abyss.png', 10, '12 +', 'À une époque où l\'humanité se flatte de tout savoir du monde, il reste un endroit qui échappe encore aux explorateurs : L\'abysse. Malgré les dangereuses créatures qui habitent ces profondeurs insondables, les précieux artefacts qu\'on y trouve attirent nombre d\'aventuriers. Ces courageux héros appelés caverniers se réunissent dans la ville d\'Orth , à la lisière de l\'abysse.\r\n\r\nRiko, la fille d\'une de ces plus célèbres aventurières, rêve de percer à jour les secrets de l\'Abysse, à commencer par un robot désactivé qu\'elle vient de rencontrer...', '2025-06-10 11:22:28', '2025-06-10 11:22:28'),
(2, 'Hunter x Hunter', 'images/1749556993_hxh.webp', 20, '12 +', 'Gon Freeks, un jeune garçon de 12 ans, rêve de devenir Hunter afin de suivre les traces de son père.', '2025-06-10 12:03:13', '2025-06-11 14:32:18'),
(3, 'k-on!', 'images/1749557372_k-on.jfif', 45, 'Tous publics', 'Yui, une jeune fille timide et réservée, décide de s\'inscrire à un club lors de son entrée au lycée. Après réflexion, son choix se porte sur le club de musique.\r\n\r\nProblème : Yui ne sait jouer d\'aucun instruments, et le club est destiné à fermer s\'il n\'y a pas de 4ème membre.', '2025-06-10 12:09:32', '2025-06-10 12:09:32'),
(4, 'Spy x Family', 'images/1749717717_Spy family 2.jpg', 50, 'Tous publics', 'C\'est la guerre froide entre l\'est et l\'ouest, et une paix précaire a été établie entre les nations d\'Ostania et Westalis. Cet accord demeurant fragile, « Twilight », un brillant espion de Westalis opérant à Ostania, est chargé de mener à bien l\'opération Strix. Celle-ci consiste à se rapprocher d\'un politicien extrémiste d\'Ostania : Donovan Desmond. Twilight se voit contraint d\'adopter un enfant et l\'inscrire à la prestigieuse école Eden, que le fils de Desmond fréquente également, car Donovan est difficile à approcher directement.\r\n\r\nSe faisant passer pour un psychiatre dénommé Loid Forger, Twilight finit par visiter un orphelinat dans sa recherche d\'un enfant. Il croise ainsi la route d\'Anya, une fillette qui peut lire les pensées des autres et est passionnée par le monde de l\'espionnage. Découvrant les véritables intentions de Loid, Anya s\'arrange pour être choisie en lui faisant croire qu\'elle peut passer le test d\'entrée d\'Eden. Anya parvient à réussir aux épreuves écrites de justesse, mais la présence de ses « deux parents » est réclamée par l\'établissement pour l\'entretien de sélection. Twilight n\'a donc d\'autre choix que de trouver une femme qui pourra endosser le rôle d\'épouse.\r\n\r\nIls rencontrent alors Yor Briar, une discrète fonctionnaire de mairie dont l\'apparence est le sujet de railleries car elle n\'est toujours pas mariée. Elle est en réalité une tueuse professionnelle opérant sous le nom de code « Princesse Ibara » et cherche un homme pour préserver sa couverture. Anya apprend avec son pouvoir que Yor est une tueuse à gages et, par curiosité, la pousse à devenir sa mère. De ce fait, les intérêts de chacun coïncident : tous trois commencent ainsi à vivre comme une famille improvisée, cachant chacun leur véritable identité aux yeux des autres.', '2025-06-12 07:50:56', '2025-06-12 10:01:15');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `mangas`
--
ALTER TABLE `mangas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `mangas`
--
ALTER TABLE `mangas`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

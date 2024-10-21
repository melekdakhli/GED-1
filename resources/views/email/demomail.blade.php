<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GED application</title>
    <style>
        .large-paragraph {
            font-size: 1.5em; /* Taille de police plus grande */
        }
    </style>
</head>
<body>
    <h1>Bienvenue {{$data}} dans l'application GED :</h1>
    <p>Votre mot de passe : {{$MailData}}</p>
    <p class="large-paragraph">Merci d'utiliser notre application. Nous espérons que vous apprécierez l'expérience !</p>
</body>
</html>

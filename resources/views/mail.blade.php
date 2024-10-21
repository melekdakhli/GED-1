<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document à envoyer par e-mail</title>
</head>
<body>
    <p>Bonjour,</p>
    <p>Veuillez trouver ci-joint le document que vous avez demandé :</p>
    <p>Nom du document : {{ $data['document_name'] }}</p>
    <p>Voici un aperçu de la première page du document :</p>
    <img src="{{ $message->embed($data['image_path']) }}" alt="Aperçu du document">
</body>
</html>

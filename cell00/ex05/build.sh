for folder_name in "$@"; do
    if mkdir "ex$folder_name"; then
        echo "Pasta 'ex$folder_name' criada com sucesso."
    else
        echo "Erro ao criar a pasta 'ex$folder_name'."
    fi
done
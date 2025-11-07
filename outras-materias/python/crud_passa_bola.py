import json


def logoLigaDasCampeas():
    logo = r"""                             
                                  @@@                                 
                        @@@@@      #      @@@@@                       
                      @  ,@@@      @     .@@@   @.                    
              /@@@@*     @        @@@        @     ,@@@@              
            %@  @@@#                               #@@@  @,           
             @ ,%       @@@,  @@@     @@@@   (        *  @            
            @  @@   @@ @@     @@@@    @@ @@  @ @  @@ @@   @           
            @  @@   @@ @@ @@ @@@@@    @@ @@ @@ @@  @@@    @           
            @  @@@@ @@ @@@@@ @@  %%   %%@@ /@  @@ @@@@@   @           
         @@@            @@   @@@ @@@@@  @@@@@             @@@         
        @ @@@@@   @@@   @@@ @@@% @@  @@ @@     @@@@  @@@@@@   @       
       @  @@     @@ @@  @*@@@ @% @@@@@@ @@    (@ @@   @@@     @       
       @  @@  @  @@@@@  @* @  @% @@     @@@@@ @@@@@@ @(  @@&  @       
       @  @@@@@ @&                                    @@@@@   @       
        @@       %         @  @  @@@@@@     @.  &    &       @#       
              @  @        @ @@@@@@    @@@@  @@@      @  @             
              @  @&           @@       @@@@@  @     @@  @             
                @   @     @   @@@@@ @@@@@    @   *@   @               
                  @@   @     @ @@@@&@@@@@      @   @@                 
                     @@   @    @@    .@@    @   @@                    
                        @@   @          .@   @@                       
                           @@   @@   @@   @@                          
                              &@   @   @#                             
                                  @@@                                 
                                                                                                                                                                                                                                                                             
    """
    print(logo)

def pega_numero(prompt="Digite um número: ", minimo=None, maximo=None):
    while True:
        try:
            v = int(input(prompt))
            if minimo is not None and v < minimo:
                print(f"O número precisa ser >= {minimo}. Tente novamente.")
                continue
            if maximo is not None and v > maximo:
                print(f"O número precisa ser <= {maximo}. Tente novamente.")
                continue
            return v
        except ValueError:
            print("Tem que ser um número inteiro. Tente novamente.")


def pega_texto(prompt="", allow_empty=False):
    while True:
        try:
            s = input(prompt).strip()
            if not allow_empty and s == "":
                print("Entrada inválida — não pode ficar vazia. Tente novamente.")
                continue
            return s
        except Exception as e:
            print(f"Erro lendo entrada: {e}")


def load_data():
    with open('dados-liga-das-campeas.json', 'r') as f:
        return json.load(f)


def save_data(data):
    with open('dados-liga-das-campeas.json', 'w') as f:
        json.dump(data, f, indent=4)
    print("\nDados salvos em dados-liga-das-campeas.json")


def list_users(data):
    for u in data.get('usuarios', []):
        print(f"- {u.get('nome')} | {u.get('email')} | {u.get('tipo_user')} | {u.get('tipo')}")


def add_user(data):
    print('\nAdicionar Usuário ')
    nome = pega_texto('Nome: ')
    email = pega_texto('Email: ')
    if any(u['email'] == email for u in data.get('usuarios', [])):
        print('Email já cadastrado.')
        return
    senha = pega_texto('Senha: ')
    
    # Loop até receber um tipo válido
    while True:
        tipo_user = pega_texto('Tipo de usuário (jogadora/admin): ').lower()
        if tipo_user in ['jogadora', 'admin']:
            break
        print('Opção inválida! Escolha entre: jogadora ou admin')
    
    tipo = None
    if tipo_user == 'jogadora':
        tipos_validos = data.get('tipos_jogadoras', [])
        print("\nPosições disponíveis:")
        for i, tipo_valido in enumerate(tipos_validos, 1):
            print(f"{i} - {tipo_valido}")
        
        while True:
            try:
                escolha = pega_numero('Escolha a posição (número): ', 1, len(tipos_validos))
                tipo = tipos_validos[escolha - 1]
                break
            except (ValueError, IndexError):
                print('Opção inválida! Escolha um número da lista.')

    novo = {"nome": nome, "email": email, "senha": senha, "tipo": tipo, "tipo_user": tipo_user}
    data.setdefault('usuarios', []).append(novo)
    print('Usuário adicionado.')


def find_user_index(data, email):
    for i, u in enumerate(data.get('usuarios', [])):
        if u.get('email') == email:
            return i
    return None


def update_user(data):
    print('\nAtualizar Usuário')
    email = pega_texto('Email do usuário a atualizar: ')
    idx = find_user_index(data, email)
    if idx is None:
        print('Usuário não encontrado.')
        return
    u = data['usuarios'][idx]
    novo_nome = pega_texto(f'Novo nome (atual: {u.get("nome")}): ', allow_empty=True)
    nova_senha = pega_texto('Nova senha (deixe vazio para manter): ', allow_empty=True)
    if novo_nome:
        u['nome'] = novo_nome
    if nova_senha:
        u['senha'] = nova_senha
    print('Usuário atualizado.')


def delete_user(data):
    print('\n Deletar Usuário ')
    email = pega_texto('Email do usuário a deletar: ')
    idx = find_user_index(data, email)
    if idx is None:
        print('Usuário não encontrado.')
        return
    data['usuarios'].pop(idx)
    print('Usuário removido.')


def list_peneiras(data):
    for p in data.get('peneiras', []):
        print(f"- ID: {p['id']} | {p['nome']} | {p['local']} | {p['data']}")


def add_peneira(data):
    print('\n Adicionar Peneira')
    nome = pega_texto('Nome: ')
    local = pega_texto('Local: ')
    data_str = pega_texto('Data (dd/mm/aaaa): ')
    novo_id = max((p['id'] for p in data.get('peneiras', [])), default=0) + 1
    data.setdefault('peneiras', []).append({'id': novo_id, 'nome': nome, 'local': local, 'data': data_str})
    print('Peneira adicionada.')


def update_peneira(data):
    print('\n Atualizar Peneira ')
    pid = pega_numero('ID da peneira: ')
    p = next((x for x in data.get('peneiras', []) if x['id'] == pid), None)
    if not p:
        print('Peneira não encontrada.')
        return
    nome = input(f'Novo nome (atual: {p["nome"]}): ').strip()
    local = pega_texto(f'Novo local (atual: {p["local"]}): ', allow_empty=True)
    data_str = pega_texto(f'Nova data (atual: {p["data"]}): ', allow_empty=True)
    if nome:
        p['nome'] = nome
    if local:
        p['local'] = local
    if data_str:
        p['data'] = data_str
    print('Peneira atualizada.')


def delete_peneira(data):
    print('\n Deletar Peneira ')
    pid = pega_numero('ID da peneira a deletar: ')
    before = len(data.get('peneiras', []))
    data['peneiras'] = [p for p in data.get('peneiras', []) if p['id'] != pid]
    if len(data['peneiras']) < before:
        print('Peneira removida.')
    else:
        print('Peneira não encontrada.')


def main_menu():
    data = load_data()
    # Exibe o logo uma vez no começo do menu
    try:
        logoLigaDasCampeas()
    except Exception:
        # Se por algum motivo o logo falhar, ignoramos e prosseguimos
        pass
    while True:
        try:
            print('\n LIsta de Opções:')
            print('1 - Listar usuários')
            print('2 - Adicionar usuário')
            print('3 - Atualizar usuário')
            print('4 - Deletar usuário')
            print('5 - Listar peneiras')
            print('6 - Adicionar peneira')
            print('7 - Atualizar peneira')
            print('8 - Deletar peneira')
            print('9 - Salvar e sair')
            print('0 - Sair sem salvar')
            esc = input('Escolha: ').strip()
            if esc == '1':
                list_users(data)
            elif esc == '2':
                add_user(data)
            elif esc == '3':
                update_user(data)
            elif esc == '4':
                delete_user(data)
            elif esc == '5':
                list_peneiras(data)
            elif esc == '6':
                add_peneira(data)
            elif esc == '7':
                update_peneira(data)
            elif esc == '8':
                delete_peneira(data)
            elif esc == '9':
                save_data(data)
                break
            elif esc == '0':
                print('Saindo sem salvar.')
                break
            else:
                print('Opção inválida.')
        except Exception as e:
            print(f"Erro inesperado: {e}")
            continue


if __name__ == '__main__':
    main_menu()

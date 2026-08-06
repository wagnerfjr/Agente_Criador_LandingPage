"""
get_or_create_pixel.py

Verifica se já existe um Meta Pixel com determinado nome no seu Business Manager.
Se existir, retorna o ID existente (evita duplicar Pixels por engano).
Se não existir, cria um novo Pixel com esse nome e retorna o ID recém-criado.

Por que isso é "mais profissional":
- Evita criar Pixels duplicados toda vez que você roda o script (idempotente)
- Você pode chamar isso de um pipeline maior (ex: "gerador de landing")
  e ele sempre garante que o Pixel certo existe, sem duplicar
- Serve de base pro "agente gerador de landing" do Milestone 4 do ROADMAP

-----------------------------------------------------------------------------
PRÉ-REQUISITOS (fazer uma vez, manualmente):
-----------------------------------------------------------------------------
1. Achar seu Business ID:
   Meta Business Suite > Configurações > Informações da empresa > ID da empresa

2. Gerar um Access Token com permissão 'ads_management':
   - Rápido (expira em 1-2h, bom pra testar): Graph API Explorer
     https://developers.facebook.com/tools/explorer/
   - Permanente (recomendado pra automação real): criar um "System User"
     em Business Settings > Users > System Users, gerar token lá
     (não expira enquanto você mantiver o token válido)

3. Nunca commitar o token no Git. Use variável de ambiente ou .env (git-ignored).

-----------------------------------------------------------------------------
USO:
-----------------------------------------------------------------------------
    export META_ACCESS_TOKEN="seu_token_aqui"
    export META_BUSINESS_ID="seu_business_id_aqui"

    python get_or_create_pixel.py "LR Fit Method"

Ou importando como função:

    from get_or_create_pixel import get_or_create_pixel
    pixel_id = get_or_create_pixel("LR Fit Method")

-----------------------------------------------------------------------------
NOTA IMPORTANTE:
-----------------------------------------------------------------------------
Verifiquei a versão da API em julho/2026 (v20.0-v21.0 confirmadas em uso).
A Meta atualiza versões do Graph API com frequência - se este script der erro
de "unsupported version", confira a versão atual em:
https://developers.facebook.com/docs/graph-api/changelog
e atualize a constante GRAPH_API_VERSION abaixo.
"""

import os
import sys
import requests

GRAPH_API_VERSION = "v21.0"
BASE_URL = f"https://graph.facebook.com/{GRAPH_API_VERSION}"


def get_or_create_pixel(pixel_name: str) -> str:
    """
    Verifica se existe um Pixel com `pixel_name` no Business Manager.
    Se existir, retorna o ID existente. Se não, cria um novo e retorna o ID.

    Args:
        pixel_name: Nome do Pixel (ex: "LR Fit Method")

    Returns:
        str: O ID do Pixel (existente ou recém-criado)

    Raises:
        ValueError: Se as variáveis de ambiente não estiverem configuradas
        requests.HTTPError: Se a API do Meta retornar erro
    """
    access_token = os.environ.get("META_ACCESS_TOKEN")
    business_id = os.environ.get("META_BUSINESS_ID")

    if not access_token or not business_id:
        raise ValueError(
            "Configure as variáveis de ambiente META_ACCESS_TOKEN e "
            "META_BUSINESS_ID antes de rodar este script."
        )

    existing_id = _find_existing_pixel(pixel_name, business_id, access_token)
    if existing_id:
        print(f"✅ Pixel '{pixel_name}' já existe. ID: {existing_id}")
        return existing_id

    new_id = _create_pixel(pixel_name, business_id, access_token)
    print(f"🆕 Pixel '{pixel_name}' criado com sucesso. ID: {new_id}")
    return new_id


def _find_existing_pixel(pixel_name: str, business_id: str, access_token: str) -> str | None:
    """Lista todos os Pixels do Business Manager e procura por nome exato."""
    url = f"{BASE_URL}/{business_id}/adspixels"
    params = {
        "fields": "id,name",
        "access_token": access_token,
        "limit": 100,  # ajuste se você tiver mais de 100 pixels
    }

    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()

    for pixel in data.get("data", []):
        if pixel.get("name", "").strip().lower() == pixel_name.strip().lower():
            return pixel["id"]

    # NOTA: se você tiver >100 pixels, precisaria paginar usando data["paging"]["next"]
    # Pouco provável pro seu caso de uso atual (poucos pixels por conta).
    return None


def _create_pixel(pixel_name: str, business_id: str, access_token: str) -> str:
    """Cria um novo Pixel com o nome dado, associado ao Business Manager."""
    url = f"{BASE_URL}/{business_id}/adspixels"
    payload = {
        "name": pixel_name,
        "access_token": access_token,
    }

    response = requests.post(url, data=payload)
    response.raise_for_status()
    data = response.json()

    return data["id"]


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python get_or_create_pixel.py \"Nome do Pixel\"")
        sys.exit(1)

    pixel_name_arg = sys.argv[1]

    try:
        pixel_id = get_or_create_pixel(pixel_name_arg)
        print(f"\nVITE_META_PIXEL_ID={pixel_id}")
        print("(copie essa linha pro seu .env.local)")
    except (ValueError, requests.HTTPError) as e:
        print(f"❌ Erro: {e}")
        sys.exit(1)

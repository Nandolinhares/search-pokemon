![poke](https://user-images.githubusercontent.com/15971419/88488950-63226100-cf67-11ea-8ef8-3dece7cac70c.png) ![pikach(1)](https://user-images.githubusercontent.com/15971419/88489051-3ae73200-cf68-11ea-8221-0e7be9fe3e2d.png)

## Arquitetura
A arquitetura foi planejada para deixar a aplicação o mais desacoplada possível, tornando mais fácil de manipular alterações e trocar de framework frontend se necessário.
Sendo assim, na camada domain fica a interface do caso de uso SearchPokemon. Na canada data temos a classe RemoteSearch que implementa a interface SearchPokemon e chama o metodo
get da classe que implementa a interface HttpGetClient. Na aplicação está sendo usado o Axios, porém pode ser alterada simplesmente na camada de infra, sem interferir no resto da aplicação.
O React fica na camada presentation, responsável só por executar o frontend e fazer as chamadas necessárias pra executados especificações já definidas nas camadas desacopladas no react.
Por fim, a camada main é o ponto de partida da aplicação.

Eu preferi por nao usar o create-react-app e sim criar tudo desacoplado, configurando webpack e tudo mais, pra tornar a escalabilidade mais fácil.

![Arquitetura](https://user-images.githubusercontent.com/15971419/102647919-59331180-4145-11eb-9187-11eebc84a048.PNG)

## Aplicação executada

![image](https://user-images.githubusercontent.com/15971419/102648499-61d81780-4146-11eb-98d7-acd5074e1ea8.png)
## Mobile

![image](https://user-images.githubusercontent.com/15971419/102648583-846a3080-4146-11eb-80ea-eadd4f099833.png)

## Executar

### `git clone https://github.com/Nandolinhares/search-pokemon.git`
### `yarn install`
### `yarn start`

## Funcionalidades
 - Pesquisar Pokemon, se existir vai retornar o pokemon buscado, senão vai retornar uma mensagem de não encontrado.
 - Adicionar Pokemon a uma lista de favoritos (Usei o próprio Context do React, pois achei desnecessário instalar as bibliotecas pro redux pra uma funcionalidade simples
 de se resolver com o Context)
 - Remover Pokemon da lista de Favoritos
 - Responsividade


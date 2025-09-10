class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    var resultado = { lista: [] };

    const prioridade = {
      gato: 0,
      cão: 1,
      jabuti: 2,
    };

    var Animais_Pessoa1 = 0;
    var Animais_Pessoa2 = 0;

    var Animais = {
      Rex: { Raca: "cão", Brinquedos: ["RATO", "BOLA"] },
      Mimi: {
        Raca: "gato",
        Brinquedos: ["BOLA", "LASER"],
      },
      Fofo: { Raca: "gato", Brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { Raca: "gato", Brinquedos: ["RATO", "BOLA"] },
      Bola: { Raca: "cão", Brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { Raca: "cão", Brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: {
        Raca: "jabuti",
        Brinquedos: ["SKATE", "RATO"],
        condicaoExtra: "Companheiro",
      },
    };

    const Brinquedos_Validos = Object.values(Animais).flatMap(
      (animal) => animal.Brinquedos
    );

    var Array_brinquedosPessoa1 = brinquedosPessoa1.split(",");
    var Array_brinquedosPessoa2 = brinquedosPessoa2.split(",");

    if (
      !Array_brinquedosPessoa1.every((item) =>
        Brinquedos_Validos.includes(item.trim())
      )
    ) {
      resultado.erro = "Brinquedo inválido";
      resultado.lista = null;
      return resultado;
    }
    if (
      !Array_brinquedosPessoa2.every((item) =>
        Brinquedos_Validos.includes(item.trim())
      )
    ) {
      resultado.erro = "Brinquedo inválido";
      resultado.lista = null;
      return resultado;
    }

    var Array_ordemAnimais = ordemAnimais.split(",");

    if (
      Array_ordemAnimais.every((item) => Object.keys(Animais).includes(item)) ==
      false
    ) {
      resultado.erro = "Animal inválido";
      resultado.lista = null;
      return resultado;
    }

    Array_ordemAnimais.sort((a, b) => {
      if (a === "Loco") return 1;
      if (b === "Loco") return -1;

      return prioridade[Animais[a].Raca] - prioridade[Animais[b].Raca];
    });

    for (let i = 0; i < Array_ordemAnimais.length; i++) {
      var Liberado1 = true;
      var Liberado2 = true;

      let animalAtual = Animais[Array_ordemAnimais[i]];
      var Ordem_Brinquedos = { Pessoa1: [], Pessoa2: [] };
      var Brinquedos_Indivduais = { Pessoa1: [], Pessoa2: [] };

      for (let j = 0; j < animalAtual.Brinquedos.length; j++) {
        let indexBrinquedo1 = Array_brinquedosPessoa1.indexOf(
          animalAtual.Brinquedos[j]
        );
        let indexBrinquedo2 = Array_brinquedosPessoa2.indexOf(
          animalAtual.Brinquedos[j]
        );
        if (indexBrinquedo1 != -1) {
          Ordem_Brinquedos.Pessoa1.push({
            Brinquedo: animalAtual.Brinquedos[j],
            index: indexBrinquedo1,
          });
        }
        if (indexBrinquedo2 != -1) {
          Ordem_Brinquedos.Pessoa2.push({
            Brinquedo: animalAtual.Brinquedos[j],
            index: indexBrinquedo2,
          });
        }
      }

      Ordem_Brinquedos.Pessoa1.sort((a, b) => a.index - b.index);
      Ordem_Brinquedos.Pessoa2.sort((a, b) => a.index - b.index);

      for (let j = 0; j < animalAtual.Brinquedos.length; j++) {
        if (
          Ordem_Brinquedos.Pessoa1.length == animalAtual.Brinquedos.length &&
          Ordem_Brinquedos.Pessoa1[j].Brinquedo == animalAtual.Brinquedos[j] &&
          Liberado1
        ) {
          if (animalAtual.Raca == "gato") {
            Brinquedos_Indivduais.Pessoa1.push(
              Ordem_Brinquedos.Pessoa1[j].Brinquedo
            );
          }
          Liberado1 = true;
        } else {
          Liberado1 = false;
        }
        if (
          Ordem_Brinquedos.Pessoa2.length == animalAtual.Brinquedos.length &&
          Ordem_Brinquedos.Pessoa2[j].Brinquedo == animalAtual.Brinquedos[j] &&
          Liberado2
        ) {
          if (animalAtual.Raca == "gato") {
            Brinquedos_Indivduais.Pessoa2.push(
              Ordem_Brinquedos.Pessoa2[j].Brinquedo
            );
          }
          Liberado2 = true;
        } else {
          Liberado2 = false;
        }
      }

      if (animalAtual.condicaoExtra == "Companheiro") {
        if (Animais_Pessoa1 > 0) {
          if (
            animalAtual.Brinquedos.every((brinquedo) =>
              Array_brinquedosPessoa1.includes(brinquedo)
            )
          ) {
            Liberado1 = true;
          }
        }
        if (Animais_Pessoa2 > 0) {
          if (
            animalAtual.Brinquedos.every((brinquedo) =>
              Array_brinquedosPessoa2.includes(brinquedo)
            )
          ) {
            Liberado2 = true;
          }
        }
      }

      if (
        (Liberado1 && Liberado2) ||
        (!Liberado1 && !Liberado2) ||
        (Animais_Pessoa2 >= 3 && Animais_Pessoa1 >= 3)
      ) {
        resultado.lista.push(Array_ordemAnimais[i] + " - abrigo");
      } else if (Liberado1 && Animais_Pessoa1 < 3) {
        Animais_Pessoa1++;
        resultado.lista.push(Array_ordemAnimais[i] + " - pessoa 1");
        Array_brinquedosPessoa1 = Array_brinquedosPessoa1.filter(
          (item) => !Brinquedos_Indivduais.Pessoa1.includes(item)
        );
      } else if (Liberado2 && Animais_Pessoa2 < 3) {
        Animais_Pessoa2++;
        resultado.lista.push(Array_ordemAnimais[i] + " - pessoa 2");
        Array_brinquedosPessoa2 = Array_brinquedosPessoa2.filter(
          (item) => !Brinquedos_Indivduais.Pessoa2.includes(item)
        );
      } else {
        resultado.lista.push(Array_ordemAnimais[i] + " - abrigo");
      }
    }

    resultado.lista.sort();

    return resultado;
  }
}

export { AbrigoAnimais as AbrigoAnimais };

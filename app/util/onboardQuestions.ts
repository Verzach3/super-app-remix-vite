export const onboardQuestions = {
  "locale": "es",
  "title": "Encuesta de Inicio",
  "logoPosition": "right",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "text",
          "name": "name",
          "title": {
            "es": "Primer Nombre"
          },
          "isRequired": true
        },
        {
          "type": "text",
          "name": "second_name",
          "title": {
            "es": "Segundo Nombre"
          }
        },
        {
          "type": "text",
          "name": "lastname",
          "title": {
            "es": "Primer Apellido"
          },
          "isRequired": true
        },
        {
          "type": "text",
          "name": "second_lastname",
          "title": {
            "es": "Segundo Apellido"
          }
        },
        {
          "type": "text",
          "name": "birth_date",
          "title": {
            "es": "Fecha de Nacimiento"
          },
          "isRequired": true,
          "inputType": "date"
        },
        {
          "type": "radiogroup",
          "name": "gender",
          "title": {
            "es": "¿Cuál es el género/sexo que le fue asignado al nacer?"
          },
          "isRequired": true,
          "choices": [
            {
              "value": "M",
              "text": {
                "es": "Masculino"
              }
            },
            {
              "value": "F",
              "text": {
                "es": "Femenino"
              }
            }
          ]
        },
        {
          "type": "text",
          "name": "phone",
          "title": {
            "es": "Numero de Telefono"
          },
          "inputType": "tel"
        }
      ]
    }
  ]
}
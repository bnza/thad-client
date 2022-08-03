describe('Media loading error', () => {
  after(() => {
    cy.clearRefreshToken()
  })

  it ('Failed loading will retry until success', () => {

    const wrongResponse = {
      "@context":"/api/contexts/MediaObjectStratigraphicUnit",
      "@id":"/api/media_object_stratigraphic_units",
      "@type":"hydra:Collection",
      "hydra:member":
        [
          {
            "@id":"/api/media_object_stratigraphic_units/151",
            "@type":"MediaObjectStratigraphicUnit",
            "id":151,
            "stratigraphicUnit":{
              "@id":"/api/stratigraphic_units/1061",
              "@type":"StratigraphicUnit",
              "id":1061,
              "number":2
            },
            "mediaObject":{
              "@id":"/api/media_objects/154",
              "@type":"http://schema.org/MediaObject",
              "id":154,
              "contentUrl":"/media/6f/6f465e7ddf64af891c617527c13b349b2673fa96ae917cf60e3fde761e44dad_kitten", // media/6f/6f465e7ddf64af891c617527c13b349b2673fa96ae917cf60e3fde761e441dad_kitten
              "mimeType":"image/jpeg",
              "document":{
                "@id":"/api/documents/154",
                "@type":"Document",
                "id":154,
                "appId":{
                  "@id":"/api/app_id/document_codes/154",
                  "@type":"DocumentCode",
                  "code":"TH.22.D.00002"
                }},
              "dimensions":[640,400]
            }}],
      "hydra:totalItems":1,
      "hydra:view":{
        "@id":"/api/media_object_stratigraphic_units?pagination=false\u0026stratigraphicUnit.id=1061",
        "@type":"hydra:PartialCollectionView"
      },
      "hydra:search":{
        "@type":"hydra:IriTemplate",
        "hydra:template":"/api/media_object_stratigraphic_units{?id,id[],stratigraphicUnit.id,stratigraphicUnit.id[],mediaObject.id,mediaObject.id[]}",
        "hydra:variableRepresentation":"BasicRepresentation",
        "hydra:mapping":[
          {
            "@type":"IriTemplateMapping",
            "variable":"id",
            "property":"id",
            "required":false
          },
          {
            "@type":"IriTemplateMapping",
            "variable":"id[]",
            "property":"id",
            "required":false

          },
          {
            "@type":"IriTemplateMapping",
            "variable":"stratigraphicUnit.id",
            "property":"stratigraphicUnit.id",
            "required":false
          },
          {
            "@type":"IriTemplateMapping",
            "variable":"stratigraphicUnit.id[]",
            "property":"stratigraphicUnit.id",
            "required":false
          },
          {
            "@type":"IriTemplateMapping",
            "variable":"mediaObject.id",
            "property":"mediaObject.id",
            "required":false
          },
          {
            "@type":"IriTemplateMapping",
            "variable":"mediaObject.id[]",
            "property":"mediaObject.id",
            "required":false}
        ]}}

    const rightResponse = {
      "@context":"/api/contexts/MediaObjectStratigraphicUnit",
      "@id":"/api/media_object_stratigraphic_units",
      "@type":"hydra:Collection",
      "hydra:member":
        [
          {
            "@id":"/api/media_object_stratigraphic_units/151",
            "@type":"MediaObjectStratigraphicUnit",
            "id":151,
            "stratigraphicUnit":{
              "@id":"/api/stratigraphic_units/1061",
              "@type":"StratigraphicUnit",
              "id":1061,
              "number":2
            },
            "mediaObject":{
              "@id":"/api/media_objects/154",
              "@type":"http://schema.org/MediaObject",
              "id":154,
              "contentUrl":"media/6f/6f465e7ddf64af891c617527c13b349b2673fa96ae917cf60e3fde761e441dad_kitten",
              "mimeType":"image/jpeg",
              "document":{
                "@id":"/api/documents/154",
                "@type":"Document",
                "id":154,
                "appId":{
                  "@id":"/api/app_id/document_codes/154",
                  "@type":"DocumentCode",
                  "code":"TH.22.D.00002"
                }},
              "dimensions":[640,400]
            }}],
      "hydra:totalItems":1,
      "hydra:view":{
        "@id":"/api/media_object_stratigraphic_units?pagination=false\u0026stratigraphicUnit.id=1061",
        "@type":"hydra:PartialCollectionView"
      },
      "hydra:search":{
        "@type":"hydra:IriTemplate",
        "hydra:template":"/api/media_object_stratigraphic_units{?id,id[],stratigraphicUnit.id,stratigraphicUnit.id[],mediaObject.id,mediaObject.id[]}",
        "hydra:variableRepresentation":"BasicRepresentation",
        "hydra:mapping":[
          {
            "@type":"IriTemplateMapping",
            "variable":"id",
            "property":"id",
            "required":false
          },
          {
            "@type":"IriTemplateMapping",
            "variable":"id[]",
            "property":"id",
            "required":false

          },
          {
            "@type":"IriTemplateMapping",
            "variable":"stratigraphicUnit.id",
            "property":"stratigraphicUnit.id",
            "required":false
          },
          {
            "@type":"IriTemplateMapping",
            "variable":"stratigraphicUnit.id[]",
            "property":"stratigraphicUnit.id",
            "required":false
          },
          {
            "@type":"IriTemplateMapping",
            "variable":"mediaObject.id",
            "property":"mediaObject.id",
            "required":false
          },
          {
            "@type":"IriTemplateMapping",
            "variable":"mediaObject.id[]",
            "property":"mediaObject.id",
            "required":false}
        ]}}

    cy.visit('/')

    cy.programmaticLogin('user_base@example.com','0000')

    cy.programmaticRoute('/data/stratigraphic_units')

    cy.get('[data-cy=collection-sus-card]')

    cy.intercept({method: 'get', path: '**/api/stratigraphic_units/*'}).as('getItemRequest')

    cy.get('[data-cy=item-crud-navigation]')
      .eq(1)
      .find('[data-cy=resource-read-btn]')
      .click()

    cy.wait('@getItemRequest').its('response.statusCode').should('eq', 200)

    cy.intercept(
      {
        method: 'GET', // Route all GET requests
        url: '**/media_object_stratigraphic_units*',
      },
      wrongResponse
    ).as('getImages')

    cy.intercept(
      {
        method: 'GET', // Route all GET requests
        url: '**/media_object_stratigraphic_units*',
      },
      wrongResponse
    ).as('getImages')

    cy.intercept(
      {
        method: 'GET', // Route all GET requests
        url: '**/media_object_stratigraphic_units*',
      },
      rightResponse
    ).as('getImages')

    cy.get('[data-cy=tab-images]').click()

    cy.wait('@getImages')
  })
})

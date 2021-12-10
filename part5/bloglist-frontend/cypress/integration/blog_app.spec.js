describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'abc',
            username: 'e1800949',
            password: '12345'
        }
        const user2 = {
            name: 'def',
            username: 'e1800950',
            password: '12345'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.request('POST', 'http://localhost:3003/api/users/', user2)
        cy.visit('http://localhost:3000')   
    })

    it('front page can be opened', function() {
        cy.contains('Blogs')
    })

    it('login form can be opened', function() {
        cy.contains('Login').click()
    })


    describe('Login', function() {
        it('user can login', function () {
            cy.contains('Login').click()
            cy.get('#username').type('e1800949')
            cy.get('#password').type('12345')
            cy.get('#login-btn').click()

            cy.contains('abc logged-in')
        })  

        it('login fails with wrong password', function() {
            cy.contains('Login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-btn').click()
        
            cy.get('.noti_error')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')

            cy.get('html').should('not.contain', 'abc logged-in')
        })
    })

    describe('when logged in', function() {    
        beforeEach(function() {
            cy.login({ username: 'e1800949', password: '12345' })
        })
        it('a new blog can be created', function() {
            cy.contains('New Blog').click()
            cy.get('#title').type('a note created by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('https://cypress.io')
            cy.contains('create').click()
            cy.contains('a note created by cypress')
        })
      })

    describe('when blogs exists', function() {
        beforeEach(function () {  
            cy.login({ username: 'e1800949', password: '12345' })
            cy.createBlog({ 
                title: 'a note created by cypress', 
                author: 'cypress', 
                url: 'https://cypress.io',
                likes: 0
            })
            cy.createBlog({
                title: 'another note created by cypress',
                author: 'cypress',
                url: 'https://cypress.io',
                likes: 0
            })
        })

        it('blog can be liked', function() {
            cy.contains('a note created by cypress').parent().find('button').click()
            .get('#like-btn').click()
            
            cy.contains('a note created by cypress').parent().find('button').click()
            cy.contains('1')
        })

        it('only user who created a blog can delete it', function() {
            cy.contains('a note created by cypress').parent().find('button').click()
            .get('#remove-btn').click()

            cy.get('.noti_success')
                .should('contain', 'blog a note created by cypress by cypress removed')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
        })

        it('when another user logs in', function() {
            cy.contains('logout').click()
            cy.login({ username: 'e1800950', password: '12345' })
            cy.contains('a note created by cypress').parent().find('button').click()
            cy.get('html').should('not.contain', 'Remove')
        })
    })

    describe('when many blogs exists', function() {
        beforeEach(function () {  
            cy.login({ username: 'e1800949', password: '12345' })
            cy.createBlog({ 
                title: 'Blog has 5 likes',
                author: 'me',
                url: 'https://cypress.io',
                likes: 5
            })
            cy.createBlog({ 
                title: 'Blog has 10 likes',
                author: 'me',
                url: 'https://cypress.io',
                likes: 10
            })
            cy.createBlog({ 
                title: 'Blog has 9 likes',
                author: 'me',
                url: 'https://cypress.io',
                likes: 9
            })
        })
        it.only('blogs are sorted by likes', function() {
            cy.get("#blogContainer > #shortBlog").should(($blog) => {
                expect($blog.eq(0)).to.contain("Blog has 10 likes");
                expect($blog.eq(1)).to.contain("Blog has 9 likes");
                expect($blog.eq(2)).to.contain("Blog has 5 likes");
              });
        })
    })
})
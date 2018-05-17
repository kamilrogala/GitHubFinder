var app = new Vue({
	el: '#app',
	data: {
		id: 'd241683d5d4180884182',
		secret: '68a1c57c8be8fc7774b5abb546caa9835b39b957',
		username: 'kamilrogala',
		userData: {},
		userRepositories: []
	},
	methods: {
		findUser: function (username) {
			this.getUserData(username);
			this.getUserRepositories(username);
		},
		getUserData: function (username) {
			fetch('https://api.github.com/users/' + username + '?client_id=' + this.id + '&client_secret=' + this.secret)
				.then(resp => resp.json())
				.then(resp => {
					this.userData.name = resp.name;
					this.userData.avatar_url = resp.avatar_url;
					this.userData.html_url = resp.html_url;
					this.userData.public_repos = resp.public_repos;
					this.userData.public_gists = resp.public_gists;
					this.userData.followers = resp.followers;
					this.userData.following = resp.following;
					this.userData.company = resp.company;
					this.userData.blog = resp.blog;
					this.userData.blog = resp.blog;
					this.userData.location = resp.location;
					this.userData.created_at = resp.created_at;
				});
		},
		getUserRepositories: function (username) {
			fetch('https://api.github.com/users/' + username + '/repos?client_id=' + this.id + '&client_secret=' + this.secret + '&sort=created:asc&per_page=5')
				.then(resp => resp.json())
				.then(resp => {
					this.userRepositories = resp;
				});
		}
	},
	created: function () {
		this.findUser(this.username);
	},
	watch: {
		username: function (username) {
			this.findUser(username)
		}
	}
});

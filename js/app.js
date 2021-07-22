Vue.component('media-post', {
    props: {
        post: Object
    },
    data: function () {
        return { 
            userId: this.post.userId,
            userName: 'initial',
            userPicThumb: '',
            postId: this.post.id,
            postPic: '',
            body: this.post.body,
            comments: []
        }
    },
    created: function() {
        let thisObj = this;
        fetch('https://jsonplaceholder.typicode.com/users?id=' + this.userId, function (res) {
            return res;
        })
        .then(function (res) { return res.json(); })
        .then(function (res) { 
            console.log(thisObj)
            thisObj.userName = res[0].name;
        });

        fetch('https://jsonplaceholder.typicode.com/photos?id=' + Math.ceil(Math.random() * 5000), function (res) {
            return res;
        })
        .then(function (res) { return res.json(); })
        .then(function (res) { 
            console.log(thisObj)
            thisObj.userPicThumb = res[0].thumbnailUrl + '.png';
        });

        fetch('https://picsum.photos/600/600', function (res) {
            return res;
        })
        .then(function (res) { return res; })
        .then(function (res) { 
            console.log(thisObj)
            thisObj.postPic = res.url;
        });

        fetch('https://jsonplaceholder.typicode.com/comments?postId=' + this.postId, function (res) {
            return res;
        })
        .then(function (res) { return res.json(); })
        .then(function (res) { 
            for(let comment of res) {
                thisObj.comments.push(comment)
            }
        });
    },

    template: `
    <div class="post">
        <div class="post-details">
            <div class="thumb-container">
                <img :src="userPicThumb" alt="">
            </div>
            <span class="user-name">{{ userName }}</span>
        </div>

        <div class="post-body">
            <p>{{ body }}</p>
        </div>

        <div class="image-container">
            <img :src="postPic" alt="">
        </div>
        
        <div class="post-divider">
            <hr class="divider-line">
            <span class="divider-label">Comments </span>
            <hr class="divider-line">
        </div>

        <div class="comments-container">
            <post-comment v-for="comment in comments" :key="comment.commentId" :comment="comment">
            </post-comment>
        </div>
    </div>
    `
})

Vue.component('post-comment', {
    props: {
        comment: Object
    },
    data: function () {
        return {
            body: this.comment.body,
            email: this.comment.email
        }
    },           
    template: `
    <p>
        <span class="user-name">{{ email }}</span>
        {{ body }}
    </p>
    `
})

let myMedia = new Vue({ 
    el: '#mediaPosts',
    data: function () {
        return {
            totalLoaded: 0,
            posts: []
        }
    },
    methods: {
        loadMore: function() {
            let thisObj = this;
            fetch('https://jsonplaceholder.typicode.com/posts?id=' + (thisObj.totalLoaded+1), function (res) {
                return res;
            })
            .then(function (res) { return res.json(); })
            .then(function (res) { 
                console.log(this);
                thisObj.posts.push(res[0]);
                    
            });
            thisObj.totalLoaded++;
        },
        loadMoreMore: function () {
            this.loadMore();
            this.loadMore();
            this.loadMore();
        }
    },
    created: function () {
        this.loadMore();
    },
    template: `
        <div class="post-container">
            <media-post class="" v-for="post in posts" :key="post.id" :post="post"></media-post>
            <div id="btnLoadMore" @click="loadMoreMore">
                <span>Load more posts</span> 
            </div>
        </div>
    `
    });

function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('hide-menu');
}

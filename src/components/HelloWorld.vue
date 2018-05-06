<template>
  <b-container class="bv-example-row">
    <ui-modal ref="errorModal" title="エラー">
      {{errorMsg}}
    </ui-modal>
    <b-row>
      <b-col>
        <section>
          <h1>作成するWikiの設定</h1>
          <div class="input-box">
            <ui-textbox
              floating-label
              label="スペース ID "
              placeholder="スペース IDを入力してください"
              help=""
              v-model="spaceId"
              required
              error="必ず入力してください"
              :invalid="spaceIdTouched && spaceId.length === 0"
              @touch="spaceIdTouched = true"
              @change="getProjectNames()"
            ></ui-textbox>
            <div class="help-message">
            <span>
              <a href='https://backlog.com/ja/support/general/what-id/'>スペースIDとは</a>
            </span>
            </div>
          </div>
          <div class="input-box">
            <ui-textbox
              floating-label
              label="API KEY"
              placeholder="API KEYを入力してください"
              v-model="userApiKey"
              required
              error="必ず入力してください"
              :invalid="userApiKeyTouched && userApiKey.length !== 64"
              :maxlength="64"
              @touch="userApiKeyTouched = true"
              @change="getProjectNames()"
            ></ui-textbox>
            <div class="help-message">
            <span>
              <a href='https://backlog.com/ja/help/usersguide/personal-settings/userguide2378'>API Keyとは</a>
            </span>
            </div>
          </div>
          <div class="input-box">
            <ui-select
              floating-label
              label="対象プロジェクト"
              placeholder="プロジェクトを選択してください"
              :options="projectNames"
              v-model="targetProject"
            ></ui-select>
          </div>
          <div class="input-box">
            <ui-textbox
              floating-label
              label="作成するマイルストーン名"
              placeholder="作成するマイルストーン名を入力してください"
              v-model="mileStoneName"
              required
              error="必ず入力してください"
              :invalid="mileStoneNameTouched && mileStoneName.length === 0"
              @touch="mileStoneNameTouched = true"
            ></ui-textbox>
          </div>
          <ui-button
            color="primary"
            icon="cloud upload"
            @click="postWikiTemplate()"
            size="large"
          >
            Wikiを作成する
          </ui-button>
        </section>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <section class="site-area">
          <h1>参考サイト</h1>
          <b-card-group deck>
            <b-card title="BootStrap-Vue"
                    img-src="static/bootstrap.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2">
              <p class="card-text">
                レイアウトに使用しています。
              </p>
              <b-button href="https://bootstrap-vue.js.org/docs/components/" variant="primary">BootStrap Document
              </b-button>
            </b-card>
            <b-card title="Keen-UI"
                    img-src="static/keen.jpg"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2">
              <p class="card-text">
                input等に使用しています。
              </p>
              <b-button href="https://josephuspaye.github.io/Keen-UI/" variant="primary">Keen UI Document</b-button>
            </b-card>
            <b-card title="Material Icon"
                    img-src="static/Material_Design.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2">
              <p class="card-text">
                ボタンのアイコンなどに使用しています
              </p>
              <b-button href="https://material.io/icons/" variant="primary">Material Icon</b-button>
            </b-card>
          </b-card-group>
        </section>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        spaceId: '',　                 //スペースID
        spaceIdTouched: false,　       //スペースIDのエラーハンドリング用
        userApiKey: '',　              //Apiキー
        userApiKeyTouched: false,     //Apiキーのエラーハンドリング用
        targetProject: '',            //対象プロジェクト
        mileStoneName: '',            //マイルストーン名
        mileStoneNameTouched: false,  //マイルストーン名のエラーハンドリング用
        projectNames: [],             //プロジェクト名のリスト表示用
        errorMsg: ''                  //モーダルのエラーメッセージ
      }
    },
    methods: {
      /**
       * プロジェクト名を取得してセレクトに代入する
       */
      getProjectNames: function () {
        // 最低条件が入っていない時は処理しない
        if (this.spaceId == "" || this.userApiKey == "" || this.userApiKey.length != 64) {
          console.log('スペースIDかAPIキーが未入力なので処理しない')
          return;
        }

        this.projectNames = []

        //値を取得してくる
        axios.get(createAxiosUrl(this.spaceId, this.userApiKey, 'projects'))
          .then(response => {
            //ソートする
            let projectList = response.data;
            projectList.sort(compareProject);

            projectList.forEach(project => {
              this.projectNames.push({
                label: project.name,
                value: project.id
              })
            })


          })
          .catch(error => {
            //エラー表示
            console.log(error);
            this.openModal('errorModal', 'プロジェクト一覧の取得に失敗しました');
          });
      },
      /**
       * モーダルを表示する
       * @param ref 表示するモーダル名
       * @param msg モーダル内のメッセージ
       */
      openModal: function (ref, msg) {
        this.$refs[ref].open();
        this.errorMsg = msg
      },
      /**
       * wikiに定型文を投稿する
       */
      postWikiTemplate: function () {
        //すべての入力が行われていることを確認する。
        if (this.spaceId == "" || this.userApiKey == '' || this.targetProject.value == '' || this.mileStoneName == '') {
          return;
        }

        const backlog = axios.create()

        axios.all([
          backlog.post(createAxiosUrl(this.spaceId, this.userApiKey, 'wikis'), createWikiRequest(this.targetProject.value, this.mileStoneName, '', '# test page'))
        ]).then(([api1Result]) => {
          console.log(api1Result)
          alert('作成した')

        }).catch(error => {
          //エラー表示
          console.log(error);
          this.openModal('errorModal', 'Wikiの作成に失敗しました');
        });
      }
    }
  }

  /**
   * REST API用のURL文字列を作成する
   * @param spaceId {string} スペースID
   * @param userApiKey {string} API Key
   * @param apiUrl {string} REST APIのURL
   * @return {string}
   */
  function createAxiosUrl(spaceId, userApiKey, apiUrl) {
    return 'https://' + spaceId + '.backlog.jp/api/v2/' + apiUrl + '?apiKey=' + userApiKey;
  }

  /**
   * プロジェクト名でソートをする
   * @param a プロジェクト名１
   * @param bプロジェクト名２
   * @return {number} 比較結果
   */
  function compareProject(a, b) {

    const projectA = a.projectKey.toUpperCase();
    const projectB = b.projectKey.toUpperCase();

    let comparison = 0;
    if (projectA > projectB) {
      comparison = 1;
    } else if (projectA < projectB) {
      comparison = -1;
    }
    return comparison;
  }

  /**
   * wikiを作成するためのデータを作成する
   * @param targetProject {string} プロジェクトID
   * @param mileStoneName {string} マイルストーン名
   * @param name {string} wikiのページ名（マイルストーン名以降のパス）
   * @param content {string} wikiの内容
   * @return {URLSearchParams} param
   */
  function createWikiRequest(targetProject, mileStoneName, name, content) {
    var params = new URLSearchParams();
    params.append('projectId', targetProject);
    params.append('name', mileStoneName);
    params.append('content', content);
    params.append('mailNotify', 'false');
    return params;
  }

</script>

<style scoped lang="scss">
  a {
    color: #42b983;
  }

  h1 {
    margin-bottom: 5vh;
    background: linear-gradient(transparent 90%, #46C997);
  }

  section {
    margin-top: 5vh;
    margin-bottom: 5vh;
  }

  .site-area {
    margin-top: 20vh;
  }

  .help-message {
    span {
      font-size: 12px;
      text-align: right;
    }

    span:before {
      content: "※";
      color: #42b983;
    }
  }

  .input-box {
    margin-bottom: 30px;
  }
  .mb-2 a{
    color: #f0f0f0;
  }
</style>

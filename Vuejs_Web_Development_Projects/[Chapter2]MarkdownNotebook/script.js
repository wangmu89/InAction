Vue.filter('date', time => luxon.DateTime.fromMillis(time).toFormat('yyyy-MM-dd HH:mm:ssZZ'));
var vue = new Vue({
  el: '#notebook',
  data: {
    // 笔记列表
    notes: [],
    // 选中的笔记ID
    selectedId: null
  },
  computed: {
    noteContentPreview() {
      if(this.selectedNote) {
        return marked.parse(this.selectedNote.content)
      }else {
        return ''
      }
    },
    // 选中的笔记
    selectedNote() {
      return this.selectedId ? this.notes.find(note => note.id === this.selectedId) : null
    },
    sortedNotes() {
      if(this.notes && this.notes.length > 0) {
        return this.notes.slice()
          .sort((a, b) => a.created - b.created)
          .sort((a, b) => (a.favorite === b.favorite ? 0 : (a.favorite ? -1 : 1)));
      }else {
        return this.notes;
      }
    },
    linesCount() {
      if(this.selectedNote) {
        return this.selectedNote.content.split(/\r\n|\r|\n/).length
      }
    },
    wordsCount() {
      if(this.selectedNote) {
        var s = this.selectedNote.content;
        // 将换行符转换为空格
        s = s.replace(/\n/g, ' ');
        // 排除开头和结尾的空格
        s = s.replace(/(^\s*)|(\s*$)/gi, '');
        // 将多个重复空格转换为1个
        s = s.replace(/\s\s+/gi, ' ')
        return s.split(' ').length
      }
    },
    charactersCount() {
      if(this.selectedNote) {
        return this.selectedNote.content.split('').length;
      }
    }
  },
  methods: {
    // 添加一条笔记
    addNote() {
      const time = Date.now();
      const note = {
        id: String(time),
        title: 'New note ' + (this.notes.length + 1),
        content: '**Hi!** This notebook(' + (this.notes.length + 1) + ') is using markdown.',
        created: time,
        favorite: false
      };
      console.log('add note: ', note);
      this.notes.push(note);
    },
    selectNote(note) {
      this.selectedId = note.id;
    },
    removeNote() {
      if(this.selectedNote && confirm('Delete the note?')) {
        const idx = this.notes.indexOf(this.selectedNote);
        if(idx !== -1) {
          this.notes.splice(idx, 1);
          this.selectedId = this.notes.length > 0 ? this.notes[0].id : null;
        }
      }
    },
    favoriteNote() {
      this.selectedNote.favorite = !this.selectedNote.favorite
    }
  },
  watch: {
    notes: {
      handler(val) {
        localStorage.setItem('notes', JSON.stringify(val))
      },
      deep: true
    },
    selectedId: {
      handler(val) {
        localStorage.setItem('selected-id', val)
      }
    }
  },
  // Vue实例创建时调用的钩子方法
  created() {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    this.selectedId = localStorage.getItem('selected-id') || null
  }
});
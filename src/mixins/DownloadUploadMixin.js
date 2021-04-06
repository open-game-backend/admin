import FileSaver from 'file-saver';

export default {
  methods: {
    downloadAsJson: function (data, fileName) {
      let json = JSON.stringify(data, null, 2);
      let blob = new Blob([json], { type: "application/json;charset=utf-8" });
      FileSaver.saveAs(blob, fileName);
    },

    uploadAsJson: function (event, url, onSuccess) {
      if (event.target.files.length <= 0) {
          event.target.value = null;
          return;
      }

      const fileReader = new FileReader();

      fileReader.onload = e => {
          const fileContents = JSON.parse(e.target.result);

          this.$api.put(url, fileContents,
              () => {
                  onSuccess(fileContents);
              });
      }
      fileReader.readAsText(event.target.files.item(0));

      event.target.value = null;
    }
  }
}

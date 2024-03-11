document.addEventListener("DOMContentLoaded", () => {
  const drop = document.querySelectorAll("input.delete");

  drop.forEach((drop_btn) => {
    drop_btn?.addEventListener("click", () => {
      const c_seq = drop_btn.closest("DIV").dataset.c_seq;
      const v_seq = drop_btn.closest("DIV").dataset.v_seq;

      document.location.href = `/commu/${v_seq}/detail/delete/${c_seq}`;
    });
  });

  const date_form = document.querySelector("form.input");
  const comment = document.querySelector("form.input input.comment");
  const btn_save = document.querySelector("input.save");
  const comment_box = document.querySelector("div.comment");
  comment_box.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.className === "btnupdate") {
      comment.focus();

      const c_seq = target.closest("DIV").dataset.c_seq;
      const v_seq = target.closest("DIV").dataset.v_seq;
      const res = await fetch(`/commu/${v_seq}/get/${c_seq}`);
      const json = await res.json();

      comment.value = json.c_comment;
      console.log(json.c_comment);
      btn_save.value = "수정";
      btn_save.classList.add("update");
      date_form.action = `/commu/${v_seq}/update/${c_seq}`;
    }
  });
});

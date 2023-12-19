import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/session";

import "./deleteModal.css";

function DeleteAccount() {
  const { closeModal } = useModal();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const deleteAccount = async (e) => {
    if (!user) {
      closeModal();
      history.push("/");
    } else {
      e.preventDefault();

      history.push("/");
      await dispatch(deleteUser(user.id)).then(closeModal);
    }
  };

  return (
    <div className="delete-button-container" id="deleteModel">
      <h2 id="delModalTitle">Confirm Delete</h2>
      <p id="delModalText">Are you sure you want to delete your account?</p>
      <div id="delModalButtons">
        <button id="delete-btn-user" onClick={deleteAccount}>
          Yes (Delete account)
        </button>
        <button id="keep-btn-user" onClick={closeModal}>
          No (Keep account)
        </button>
      </div>
    </div>
  );
}

export default DeleteAccount;

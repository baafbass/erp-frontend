import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const DilSilme = ({ openDialog, handleCloseDialog, handleDelete }) => {
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Dil Sil</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Bu dili silmek istediğinizden emin misiniz?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          İptal
        </Button>
        <Button onClick={handleDelete} color="secondary" autoFocus>
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DilSilme;

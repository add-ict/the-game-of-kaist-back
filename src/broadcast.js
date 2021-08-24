const broadcast = (classRef,message,description) => {
    const payload={
        message,
        description,
        life: Date.now()+3000,
    };
    return classRef.child("MESSAGE").push().set(payload);
}
export default broadcast;
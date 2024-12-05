const canDM = async (user) => {
    try {
        const sentMessage = await user.send("Indexing...");
        return { success: true, message: sentMessage };
    } catch (error) {
        if (error.code === 50007) {
            return { success: false };
        } else {
            return { success: 404, error: error.message };
        }
    }
};

module.exports = {
    canDM,
};

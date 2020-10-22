from djoser import views


class TokenLoginView(views.TokenCreateView):
    pass


class TokenLogoutView(views.TokenDestroyView):
    pass
